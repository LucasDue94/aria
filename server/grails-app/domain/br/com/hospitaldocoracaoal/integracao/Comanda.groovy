package br.com.hospitaldocoracaoal.integracao

class Comanda implements Serializable{

    String tipo
    String comanda
    RegistroAtendimento registroAtendimento
    String dataMovimento
    Setor setor

    static constraints = {
    }

    static mapping = {
        id composite: ['tipo', 'comanda']
        version  false
    }
}
