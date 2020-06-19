package br.com.hospitaldocoracaoal.integracao

class HigienizacaoLeito implements Serializable{
    Date dataAbertura
    String status
    static belongsTo = [leito: Leito]

    static constraints = {
        status nullable: true
    }

    static mapping = {
        version false
        id composite: ['leito', 'dataAbertura']
    }
}
