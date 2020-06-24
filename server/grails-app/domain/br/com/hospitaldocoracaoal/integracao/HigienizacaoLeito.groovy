package br.com.hospitaldocoracaoal.integracao

class HigienizacaoLeito implements Serializable{
    Date dataAbertura
    Atendimento atendimento
    String status

    static belongsTo = [leito: Leito]

    static constraints = {
        status nullable: true
        atendimento nullable: true
    }

    static mapping = {
        version false
        id composite: ['leito', 'dataAbertura']
    }
}
