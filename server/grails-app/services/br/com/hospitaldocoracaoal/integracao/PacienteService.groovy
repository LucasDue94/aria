package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Paciente)
abstract class PacienteService {

    abstract Paciente get(Serializable id)

    List<Paciente> list(GrailsParameterMap args) {
        Setor setor = Setor.get args.long('setor')
        if (setor == null) throw new IllegalArgumentException("Setor não encontrado.")

        def query = Paciente.where {
            registros {
                tipo == args.char('tipo')
                    registroAtendimentoLeitos {
                        leito in setor.leitos
                    }
            }
        }

        query.list(args)
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Paciente save(Paciente paciente)

}