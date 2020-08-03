package br.com.hospitaldocoracaoal.integracao

import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap

@Service(Cid)
abstract class CidService {

    abstract Cid get(Serializable id)

    List<Cid> list(GrailsParameterMap args) {

        String termo = args.termo

        def criteria = Cid.createCriteria()
        List<Cid> cids = (List<Cid>) criteria.list(args) {
            if (termo != null && !termo.empty) {
                or {
                    ilike 'id', "%$termo%"
                    ilike 'descricao', "%$termo%"
                }

            }
        }

        return cids

    }


    abstract Long count()

    abstract void delete(Serializable id)

    abstract Cid save(Cid cid)

}