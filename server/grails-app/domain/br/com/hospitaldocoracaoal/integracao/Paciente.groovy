package br.com.hospitaldocoracaoal.integracao

class Paciente {

    String id
    String nome
    Character sexo
    Date nascimento
    String nomeMae
    static transients = ['status', 'getUltimoAtendimento', 'sortedAtendimentos']
    static hasMany = [
            atendimentos: Atendimento
    ]

    static mapping = {
        id generator: 'assigned'
        version  false
    }

    /**
     *  Retorna o status de inernação do paciente (Internado / Alta)
     */
    String getStatus() {
        this.getUltimoAtendimento()?.dataAlta == null ? 'Internado' : 'Alta'
    }

    Atendimento getUltimoAtendimento() {
        this.atendimentos.any() ? this.atendimentos.sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada }.last() : null
    }

    List<Atendimento> getSortedAtendimentos() {
        this.atendimentos.any() ? this.atendimentos.sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada } : null
    }
}
