package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(Risco)
abstract class RiscoService {

    abstract Risco get(Serializable id)

    List<Risco> list(Map args) {
        Risco.createCriteria().list(args) {
            if(args.get('termo') != null && !args.get('termo').isEmpty()) {
                ilike('nome', "%${args.get('termo')}%")
            }
        } as List<Risco>
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Risco save(Risco risco)

}