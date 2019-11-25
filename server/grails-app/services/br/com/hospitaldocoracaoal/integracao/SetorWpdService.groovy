package br.com.hospitaldocoracaoal.integracao


import grails.gorm.services.Service

@Service(SetorWpd)
abstract class SetorWpdService {

    abstract SetorWpd get(Serializable id)

    List<SetorWpd> list(Map args, String termo) {
        def criteria = SetorWpd.createCriteria()
        List<SetorWpd> setoresWpd = (List<SetorWpd>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike 'id',"%${termo}%"
                    ilike 'descricao',"%${termo}%"
                }
            }
            order "descricao","asc"
        }
        return setoresWpd
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract SetorWpd save(SetorWpd setorWpd)

}