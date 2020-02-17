package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito
import br.com.hospitaldocoracaoal.integracao.SetorWpd
import grails.gorm.services.Service
import grails.validation.ValidationException
import grails.web.servlet.mvc.GrailsParameterMap
import org.hibernate.sql.JoinType

@Service(Incidente)
abstract class IncidenteService {

    abstract Incidente get(Serializable id)

    abstract List<Incidente> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    def report(GrailsParameterMap args) {
        Date dataInicio = DataUtils.getFormatterToDate(args.dataInicio)
        Date dataFim = DataUtils.endOfDay(DataUtils.getFormatterToDate(args.dataFim))

        def criteria = Incidente.createCriteria()

        def result = criteria.list() {
            between 'dataHora', dataInicio, dataFim
            setor {
                eq 'id', args.long('setorId')
            }

            projections {
                groupProperty 'tipoIncidente'
                count()
            }
        }

        result.collect {
            [tipoIncidente: it[0].nome, quantidade: it[1]]
        }
    }

    Incidente save(Incidente incidente, String pacienteId) {
        List<RegistroAtendimento> registros = (List<RegistroAtendimento>) RegistroAtendimento.createCriteria().list(sort: 'dataEntrada') {
            paciente {
                eq 'id', pacienteId
            }

            le 'dataEntrada', incidente.dataHora
            or {
                ge 'dataAlta', incidente.dataHora
                isNull 'dataAlta'
            }
        }

        if (registros != null && !registros.isEmpty()) {
            RegistroAtendimento registroAtendimento = registros.last()
            SetorWpd setorWpd = null

            switch (registroAtendimento.tipo) {
                case 'I':
                    RegistroAtendimentoLeito registroAtendimentoLeito = registroAtendimento.registroAtendimentoLeitos
                            .sort { ral1, ral2 -> ral1.dataEntrada <=> ral2.dataEntrada }
                            .find {  it.dataEntrada <= incidente.dataHora }
                    setorWpd = registroAtendimentoLeito.leito.setor
                    break;
                case 'A':
                case 'E':
                case 'U':
                    setorWpd = registroAtendimento.setor
                    break;
                default:
                    incidente.errors.reject(
                            'incidente.registroAtendimento.doesnt.exist',
                            'Não foi possível criar um incidente. Tipo de registro inválido.'
                    )
                    throw new ValidationException('Incidente inválido.', incidente.errors)
            }

            incidente.registroAtendimento = registroAtendimento
            incidente.setor = Setor.findBySetorWpd setorWpd

            incidente.validate()
        } else {
            incidente.errors.reject(
                    'incidente.registroAtendimento.doesnt.exist',
                    'Registro não encontrado para a data e hora informados.'
            )
            throw new ValidationException('Incidente inválido.', incidente.errors)
        }

        if (incidente.hasErrors()) {
            throw new ValidationException('Incidente inválido.', incidente.errors)
        }

        incidente.save(flush: true)
    }
}