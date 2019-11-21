package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.integracao.SetorWpd

class Setor {

    String descricao
    SetorWpd setorWpd
    String sigla
    TipoSetor tipoSetor

    static constraints = {
        descricao nullable: false, blank: false, unique: true
        sigla nullable: false, blank: false, unique: true
        setorWpd nullable: false, unique: true
    }

    static mapping = {
        tipoSetor enumType: 'identity'
    }
}