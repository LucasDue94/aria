package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import br.com.hospitaldocoracaoal.integracao.Atendimento
import br.com.hospitaldocoracaoal.integracao.RegistroLeito
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
        long tipoIncidenteId = args.long('tipoIncidenteId')

        Setor setor = Setor.get args.long('setorId')

        def criteria = Atendimento.createCriteria()
        def result = criteria.list {
            createAlias 'incidentes', 'i', JoinType.LEFT_OUTER_JOIN
            createAlias 'i.tipoIncidente', 'ti', JoinType.LEFT_OUTER_JOIN
            createAlias 'registroLeitos', 'ral', JoinType.LEFT_OUTER_JOIN
            createAlias 'ral.leito', 'l', JoinType.LEFT_OUTER_JOIN

            or {
                and {
                    ne 'tipo', Atendimento.TIPO_INTERNO
                    eq 'setor', setor.setorWpd
                    between 'dataEntrada', dataInicio, dataFim
                }

                and {
                    eq 'tipo', Atendimento.TIPO_INTERNO
                    between 'ral.dataEntrada', dataInicio, dataFim
                    eq 'l.setor', setor.setorWpd
                }
            }

            or {
                eq 'ti.id', args.long('tipoIncidenteId')
                isNull 'ti.id'
            }

            projections {
                groupProperty 'ti.id'
                count()
            }
        }

        if(result.size == 1) {
            return [incidentes: 0, semIncidentes: result[0][1]]
        }

        [incidentes: result[0][1], semIncidentes: result[1][1]]
    }

    Incidente save(Incidente incidente, String pacienteId) {
        List<Atendimento> registros = (List<Atendimento>) Atendimento.createCriteria().list(sort: 'dataEntrada') {
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
            Atendimento atendimento = registros.last()
//            Todo: Setor WPD
              Setor setor = null

            switch (atendimento.tipo) {
                case 'I':
                    RegistroLeito registroLeito = atendimento.registroLeitos
                            .sort { ral1, ral2 -> ral1.dataEntrada <=> ral2.dataEntrada }
                            .find {  it.dataEntrada <= incidente.dataHora }
                    setor = registroLeito.leito.setor
                    break;
                case 'A':
                case 'E':
                case 'U':
                    setor = atendimento.setor
                    break;
                default:
                    incidente.errors.reject(
                            'incidente.atendimento.doesnt.exist',
                            'Não foi possível criar um incidente. Tipo de registro inválido.'
                    )
                    throw new ValidationException('Incidente inválido.', incidente.errors)
            }

            incidente.atendimento = atendimento
            incidente.setor = setor

            incidente.validate()
        } else {
            incidente.errors.reject(
                    'incidente.atendimento.doesnt.exist',
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