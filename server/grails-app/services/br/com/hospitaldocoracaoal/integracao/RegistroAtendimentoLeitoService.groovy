package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

import static org.hibernate.sql.JoinType.INNER_JOIN

@Service(RegistroAtendimentoLeito)
abstract class RegistroAtendimentoLeitoService {

    abstract RegistroAtendimentoLeito get(Serializable id)

    abstract List<RegistroAtendimentoLeito> list(Map args)

    List<RegistroAtendimentoLeito> admissoesSetor(GrailsParameterMap args, String termo, String setorId, String dataEntradaInicio,
                                                  String dataEntradaFim) {

        def criteria = RegistroAtendimentoLeito.createCriteria()
        Map queryArgs = (Map) args.clone()
        if (termo != null && !termo.empty) {
            queryArgs.remove 'sort'
            queryArgs.remove 'order'
        }

        criteria.list(queryArgs) {
            createAlias 'leito', 'lei', INNER_JOIN
            createAlias 'lei.setor', 'setorWpd', INNER_JOIN

            if (termo != null && !termo.empty) {
                createAlias 'registroAtendimento', 'ra', INNER_JOIN
                createAlias 'ra.paciente', 'paciente', INNER_JOIN

                or {
                    ilike 'ra.id', "%$termo%"
                    ilike 'paciente.id', "%$termo%"
                    ilike 'paciente.nome', "%$termo%"
                }
            }

            if (setorId != null && setorId != '' && setorId != 'null') {
                Setor s = Setor.get setorId
                eq 'setorWpd.id', s.setorWpdId
            } else {
                List<Setor> setoresAria = Setor.findAllByTipoSetor(TipoSetor.UTI)
                List<SetorWpd> setores = SetorWpd.getAll(setoresAria.setorWpd.id)

                'in' 'setorWpd.id', setores.id
            }

            if (dataEntradaInicio != null && dataEntradaInicio != '' && dataEntradaFim != null && dataEntradaFim != '') {
                Date dataInicio = DataUtils.getFormatterToDate(dataEntradaInicio)
                Date dataFim = DataUtils.endOfDay(DataUtils.getFormatterToDate(dataEntradaFim))

                between 'dataEntrada', dataInicio, dataFim
            }
        } as List<RegistroAtendimentoLeito>
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract RegistroAtendimentoLeito save(RegistroAtendimentoLeito registroAtendimentoLeito)

}