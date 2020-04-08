package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor

class Comanda implements Serializable{

    String tipo
    String comanda
    Atendimento registroAtendimento
    String dataMovimento
    Setor setor

    static constraints = {
    }

    static mapping = {
        id composite: ['tipo', 'comanda']
        version  false
    }
}
