package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.integracao.Leito

class Setor {
    String id
    String descricao
    String sigla
    TipoSetor tipoSetor
    Integer prazoApache
    static hasMany = [usuarios: Usuario, leitos: Leito]
    static belongsTo = [Usuario]

    static constraints = {
        descricao nullable: false, blank: false
        sigla nullable: true, blank: true
        prazoApache nullable: true
        tipoSetor nullable: true
    }

    static mapping = {
        id generator: 'assigned'
        version false
        tipoSetor enumType: 'identity'
    }
}