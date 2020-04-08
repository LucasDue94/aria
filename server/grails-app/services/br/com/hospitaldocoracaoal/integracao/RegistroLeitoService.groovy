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

    def list(Map args, String setorId, String tipoSetor) {

        def query = ''
        def queryParams = [:]

        if (setorId != null && !setorId.empty) {
            Setor setorAria = Setor.get setorId
            query = 'and s.id = :setorWpd'
            queryParams.put('setorWpd', setorAria.setorWpdId)
        } else {
            List<Setor> setoresAria = Setor.findAllByTipoSetor(TipoSetor.tipoSetorPorId(tipoSetor))
            // TODO: refactoring
            List<Setor> setoresWpd = tipoSetor == null || tipoSetor == '' ? SetorWpd.getAll() : setoresAria.setorWpd
            query = 'and s.id in :setoresWpd'
            queryParams.put('setoresWpd', setoresWpd.id)
        }

        String hqlInternos = """select ral
            from RegistroAtendimentoLeito ral
                inner join ral.registroAtendimento r
                inner join ral.leito l
                inner join l.setor s
            where r.dataAlta is null
              and not exists(from RegistroAtendimentoLeito ral2
                                inner join ral2.registroAtendimento r2
                                inner join ral2.leito l2
                                inner join l2.setor s2
                            where r2.id = r.id
                              and s2.id <> s.id
                              and ral2.dataEntrada > ral.dataEntrada)
                $query"""

        List<RegistroLeito> pacienteInternos = RegistroLeito.findAll hqlInternos, queryParams

        String hqlOutros = """select ral
              from RegistroAtendimentoLeito ral
                  inner join ral.registroAtendimento r
                  inner join ral.leito l
                  inner join l.setor s
              where r.dataAlta is not null
                or exists(from RegistroAtendimentoLeito ral2
                                  inner join ral2.registroAtendimento r2
                                  inner join ral2.leito l2
                                  inner join l2.setor s2
                              where r2.id = r.id
                                and s2.id <> s.id
                                and ral2.dataEntrada > ral.dataEntrada)
               $query"""

        List<RegistroLeito> outrosPacientes = RegistroLeito.findAll hqlOutros, queryParams, [offset:args.offset, max: 30]

        return [
                pacientesInternos: pacienteInternos,
                outrosPacientes  : outrosPacientes
        ]
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
                List<Setor> setores = SetorWpd.getAll(setoresAria.setorWpd.id)

                'in' 'setorWpd.id', setores.id
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

    abstract RegistroLeito save(RegistroLeito registroAtendimentoLeito)

}