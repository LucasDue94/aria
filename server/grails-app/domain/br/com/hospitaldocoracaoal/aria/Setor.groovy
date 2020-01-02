package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.integracao.Leito
import br.com.hospitaldocoracaoal.integracao.SetorWpd

class Setor {
    String descricao
    SetorWpd setorWpd
    String sigla
    TipoSetor tipoSetor
    static hasMany = [usuarios: Usuario]
    static belongsTo = [Usuario]

    static constraints = {
        descricao nullable: false, blank: false, unique: true
        sigla nullable: false, blank: false, unique: true
        setorWpd nullable: false, unique: true
    }

    static mapping = {
        tipoSetor enumType: 'identity'
    }

    static transients = ['leitos']

    Set<Leito> getLeitos() {
        setorWpd.leitos
    }
}