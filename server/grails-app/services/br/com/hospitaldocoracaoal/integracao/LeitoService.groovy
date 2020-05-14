package br.com.hospitaldocoracaoal.integracao

import grails.gorm.services.Service

@Service(Leito)
abstract class LeitoService {

    abstract  Leito get(Serializable id)

    List<Leito> list(Map args) {
        return Leito.where {
            (tipo != 'VIRTUAL') && (unidade == '0001') && (dataDesativacao == null)
        }.list(args)
    }

    abstract  Long count()

    abstract  void delete(Serializable id)

    abstract  Leito save(Leito leito)

}