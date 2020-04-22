package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

import static org.hibernate.sql.JoinType.INNER_JOIN

@Service(RegistroLeito)
abstract class RegistroLeitoService {

    abstract RegistroLeito get(Serializable id)

    def list(GrailsParameterMap args, String setorId, String tipoSetorId, Boolean internos) {
        StringBuilder query = new StringBuilder()
        def queryParams = [:]

        if (setorId != null && !setorId.empty) {
            Setor setor = Setor.get setorId
            if (query.length() > 0) query.append 'and '
            query.append 's.id = :setor\n'
            queryParams.put('setor', setor.id)
        }

        if (tipoSetorId != null && !tipoSetorId.empty) {
            TipoSetor tipoSetor = TipoSetor.tipoSetorPorId(tipoSetorId)
            if (query.length() > 0) query.append 'and '
            query.append 's.tipoSetor = :tipoSetor\n'
            queryParams.put('tipoSetor', tipoSetor)
        }

        if (internos != null) {
            if (query.length() > 0) query.append 'and '
            if (internos) {
                query.append 'a.dataAlta is null and not '
            } else {
                query.append 'a.dataAlta is not null or '
            }

            query.append """exists(from RegistroLeito rl2
                                inner join rl2.atendimento a2
                                inner join rl2.leito l2
                                inner join l2.setor s2
                            where a2.id = a.id
                              and s2.id <> s.id
                              and rl2.dataEntrada > rl.dataEntrada)\n"""
        }

        String hql = """select rl
            from RegistroLeito rl
                inner join rl.atendimento a
                inner join rl.leito l
                inner join l.setor s
            where $query
            order by rl.dataEntrada desc"""

        RegistroLeito.findAll hql, queryParams, args
    }

    List<RegistroLeito> admissoesSetor(GrailsParameterMap args, String termo, String setorId, String dataEntradaInicio,
                                       String dataEntradaFim) {

        def criteria = RegistroLeito.createCriteria()
        Map queryArgs = (Map) args.clone()
        if (termo != null && !termo.empty) {
            queryArgs.remove 'sort'
            queryArgs.remove 'order'
        }

        criteria.list(queryArgs) {
            createAlias 'leito', 'lei', INNER_JOIN
            createAlias 'lei.setor', 'setor', INNER_JOIN

            if (termo != null && !termo.empty) {
                createAlias 'atendimento', 'at', INNER_JOIN
                createAlias 'at.paciente', 'paciente', INNER_JOIN

                or {
                    ilike 'at.id', "%$termo%"
                    ilike 'paciente.id', "%$termo%"
                    ilike 'paciente.nome', "%$termo%"
                }
            }

            if (setorId != null && setorId != '' && setorId != 'null') {
                Setor s = Setor.get setorId
                eq 'id', s.id
            } else {
                List<Setor> setoresAria = Setor.findAllByTipoSetor(TipoSetor.UTI)
                List<Setor> setores = SetorWpd.getAll(setoresAria.setorWpd.id)

                'in' 'id', setores.id
            }

            if (dataEntradaInicio != null && dataEntradaInicio != '' && dataEntradaFim != null && dataEntradaFim != '') {
                Date dataInicio = DataUtils.getFormatterToDate(dataEntradaInicio)
                Date dataFim = DataUtils.endOfDay(DataUtils.getFormatterToDate(dataEntradaFim))

                between 'dataEntrada', dataInicio, dataFim
            }
        } as List<RegistroLeito>
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract RegistroLeito save(RegistroLeito registroLeito)

}