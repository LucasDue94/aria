package br.com.hospitaldocoracaoal.aria


import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito
import br.com.hospitaldocoracaoal.integracao.SetorWpd
import grails.gorm.services.Service

@Service(Incidente)
abstract class IncidenteService {

    abstract Incidente get(Serializable id)

    abstract List<Incidente> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

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

        if (registros == null && registros.isEmpty()) {
            // TODO: ERROR
        }

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
                setorWpd = null // TODO: ERROR
        }

        incidente.registroAtendimento = registroAtendimento
        incidente.setor = Setor.findBySetorWpd setorWpd

        if (!incidente.validate()) {
            // TODO: ERROR
        }

        incidente.save(flush: true)
    }
}