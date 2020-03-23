package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

import static org.hibernate.sql.JoinType.INNER_JOIN
import static org.hibernate.sql.JoinType.LEFT_OUTER_JOIN

@Service(RegistroAtendimento)
abstract class RegistroAtendimentoService {


    List<RegistroAtendimento> list(GrailsParameterMap args, String termo, String setorId, String dataEntradaInicio,
                                   String dataEntradaFim, Character tipoRegistro) {
        def criteria = RegistroAtendimento.createCriteria()
        criteria.list(args) {
            createAlias 'paciente', 'p', INNER_JOIN

            if (setorId != null && setorId != '') {
                createAlias 'registroAtendimentoLeitos', 'registroLeitos', LEFT_OUTER_JOIN
                createAlias 'registroLeitos.leito', 'leito', LEFT_OUTER_JOIN
                createAlias 'leito.setor', 'setorWpd', LEFT_OUTER_JOIN
                Setor s = Setor.get(setorId)

                or {
                    eq 'setorWpd.id', s.setorWpdId
                    setor {
                        eq 'id', s.setorWpdId
                    }
                }
            }

            if (tipoRegistro == RegistroAtendimento.TIPO_EMERGENCIA || tipoRegistro == RegistroAtendimento.TIPO_INTERNO) {
                eq 'tipo', tipoRegistro
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
        } as List<RegistroAtendimento>
    }

    abstract Long count()

    RegistroAtendimento get(String id) {
        RegistroAtendimento.findById(id)
    }
}












