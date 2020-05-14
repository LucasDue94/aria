package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor
import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(RegistroLeito)
abstract class RegistroLeitoService {

    abstract RegistroLeito get(Serializable id)

    def list(GrailsParameterMap args) {
        def queryParams = [:]
        StringBuilder query = new StringBuilder()

        String setorId = args.setorId
        String tipoSetorId = args.tipoSetor
        String termo = args.termo
        Boolean internos = args.boolean('internos')
        Date dataEntradaInicio = null
        Date dataEntradaFim = null

        if (args.inicio != null && !args.inicio.empty && args.fim != null && !args.fim.empty) {
            dataEntradaInicio = DataUtils.getFormatterToDate(args.inicio)
            dataEntradaFim = DataUtils.endOfDay(DataUtils.getFormatterToDate(args.fim))

            if (query.length() > 0) query.append 'and '
            query.append('rl.dataEntrada between :dataEntradaInicio and :dataEntradaFim\n')
            queryParams.put('dataEntradaInicio', dataEntradaInicio)
            queryParams.put('dataEntradaFim', dataEntradaFim)
        }

        if (termo != null && !termo.empty) {
            if (query.length() > 0) query.append 'and '
            query.append('(lower(p.nome) like lower(:termo) or ')
            query.append('a.id like :atendimentoId or ')
            query.append('p.id like :pacienteId)\n')
            queryParams.put('termo', "%$termo%")
            queryParams.put('atendimentoId', "%$termo%")
            queryParams.put('pacienteId', "%$termo%")
        }

        if (setorId != null && !setorId.empty) {
            Setor setor = Setor.get setorId
            if (query.length() > 0) query.append 'and '
            query.append 's.id = :setor\n'
            queryParams.put('setor', setor.id)
        }

        if (tipoSetorId != null && !tipoSetorId.empty) {
            TipoSetor tipoSetor = TipoSetor.tipoSetorPorId(tipoSetorId)
            if (query.length() > 0) query.append 'and '
            query.append 's.id in (select id from Setor where tipoSetor = :tipoSetor)\n'
            queryParams.put('tipoSetor', tipoSetor)
        }

        if (internos != null) {
            if (query.length() > 0) query.append 'and '
            if (internos) {
                query.append 'a.dataAlta is null and not '
            } else {
                query.append '(a.dataAlta is not null or '
            }

            query.append """exists(from RegistroLeito rl2
                                inner join rl2.atendimento a2
                                inner join rl2.leito l2
                                inner join l2.setor s2
                            where a2.id = a.id
                              and s2.id <> s.id
                              and rl2.dataEntrada > rl.dataEntrada)"""

            if (!internos) query.append ')'
            query.append '\n'
        }

        if (query.length() > 0) query.insert(0, 'where ')

        String hql = """select rl
            from RegistroLeito rl
                inner join rl.atendimento a
                inner join a.paciente p
                inner join rl.leito l
                inner join l.setor s
                $query
                order by rl.dataEntrada desc"""

        RegistroLeito.findAll(hql, queryParams, args)
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract RegistroLeito save(RegistroLeito registroLeito)

}
