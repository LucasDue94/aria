package br.com.hospitaldocoracaoal.integracao


import br.com.hospitaldocoracaoal.aria.Setor
import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

import static org.hibernate.sql.JoinType.INNER_JOIN
import static org.hibernate.sql.JoinType.LEFT_OUTER_JOIN

@Service(Atendimento)
abstract class AtendimentoService {


    List<Atendimento> list(GrailsParameterMap args, String termo, String setorId, String dataEntradaInicio,
                           String dataEntradaFim, Character tipoAtendimento) {
        def criteria = Atendimento.createCriteria()
        criteria.list(args) {
            createAlias 'paciente', 'p', INNER_JOIN

            if (setorId != null && setorId != '') {
                createAlias 'registroLeitos', 'registroLeitos', LEFT_OUTER_JOIN
                createAlias 'registroLeitos.leito', 'leito', LEFT_OUTER_JOIN
                createAlias 'leito.setor', 'setor', LEFT_OUTER_JOIN
                Setor s = Setor.get(setorId)

                or {
                    and {
                        eq 'tipo', Atendimento.TIPO_INTERNO
                        eq 'setor.id', s.id
                    }
                    and {
                        ne'tipo', Atendimento.TIPO_INTERNO
                        setor {
                            eq 'id', s.id
                        }
                    }
                }
            }

            if (tipoAtendimento == Atendimento.TIPO_EMERGENCIA || tipoAtendimento == Atendimento.TIPO_INTERNO) {
                eq 'tipo', tipoAtendimento
            }

            if (termo != null && termo != '') {
                or {
                    ilike 'id', "%$termo%"
                    ilike 'p.nome', "%$termo%"
                    ilike 'p.id', "%$termo%"
                }
            }

            if (dataEntradaInicio != null && dataEntradaInicio != '' && dataEntradaFim != null && dataEntradaFim != '') {
                Date dataInicio = DataUtils.getFormatterToDate(dataEntradaInicio)
                Date dataFim = DataUtils.endOfDay(DataUtils.getFormatterToDate(dataEntradaFim))

                between 'dataEntrada', dataInicio, dataFim
            }
        } as List<Atendimento>
    }

    abstract Long count()

    abstract Atendimento get(Serializable id)

}












