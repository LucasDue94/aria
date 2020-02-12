package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Paciente)
abstract class PacienteService {

    abstract Paciente get(Serializable id)

    List<Paciente> list(GrailsParameterMap args) {
        Setor setor = null
        def termo = ''
        if(args.containsKey('setor') && args.get('setor').toString() != '') {
            setor = Setor.get args.long('setor')
            if (setor == null) throw new IllegalArgumentException("Setor não encontrado.")
            if (setor.leitos == null || setor.leitos.size() == 0) throw new IllegalArgumentException("O setor ${setor.descricao} não possui leitos.")
        }

        if(args.containsKey('termo')) {
            termo = args.get('termo')
        }

        def query = Paciente.where {
            if (termo != null && !termo.isEmpty()) {
                nome =~ "%${termo}%"
            }

            registrosAtendimento {
                if(args.containsKey('tipo')) {
                    tipo == args.char('tipo')
                }
                if (setor != null) {
                    registroAtendimentoLeitos {
                        leito in setor.leitos
                    }
                }
            }
        }

        query.list(args)
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Paciente save(Paciente paciente)

}