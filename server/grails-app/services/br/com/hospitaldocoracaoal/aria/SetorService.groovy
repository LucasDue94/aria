package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Setor)
abstract class SetorService {

    abstract Setor get(Serializable id)

    List<Setor> list(GrailsParameterMap args, String tipoSetor) {
        TipoSetor tipo = TipoSetor.tipoSetorPorId tipoSetor
        Boolean fetchAll = args.boolean('fetchAll')

        def criteria = Setor.createCriteria()
        criteria.list(args) {
            if(!fetchAll) {
                eq('habilitado', true)
            }
            if (tipoSetor != null && !tipoSetor.empty) {
                eq 'tipoSetor', tipo
            }
        } as List<Setor>
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Setor save(Setor setor)

}

