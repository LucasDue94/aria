package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import grails.gorm.services.Service
import org.springframework.security.access.prepost.PreAuthorize

@Service(Setor)
abstract class SetorService {

    abstract Setor get(Serializable id)

    List<Setor> list(Map args, String tipoSetor) {
        TipoSetor tipo = TipoSetor.tipoSetorPorId tipoSetor

        def criteria = Setor.createCriteria()
        criteria.list(args) {
            if (tipoSetor != null && !tipoSetor.empty) {
                eq 'tipoSetor', tipo
            }
        } as List<Setor>
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Setor save(Setor setor)

}

