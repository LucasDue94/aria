package br.com.hospitaldocoracaoal.integracao

import br.com.hospitaldocoracaoal.aria.Setor

class Leito {

    String id
    String descricao
    Setor setor
    String tipo
    Atendimento atendimento
    String unidade
    Date dataDesativacao

    static hasMany = [registroLeitos: RegistroLeito, higienizacaoLeitos: HigienizacaoLeito,
                      reservaLeitos: ReservaLeito, interdicaoLeitos: InterdicaoLeito]

    static transients = ['status']

    static mapping = {
        id generator: 'assigned'
        version false
    }

    String getStatus() {
        def higienizacoes = this.higienizacaoLeitos.sort { n1, n2 -> n1.dataAbertura <=> n2.dataAbertura }
        if((atendimento != null && atendimento.dataAltaMedica == null && atendimento.dataAlta == null) ||
                (atendimento == null && (!higienizacoes.isEmpty() && higienizacoes.find({ it.status == null || it.status in ['2', '3']})))) return 'O'
        if(atendimento != null && atendimento.dataAltaMedica != null && atendimento.dataAlta == null) return 'AM'

        if (!higienizacoes.empty) {
            HigienizacaoLeito ultimaHigienizacao = higienizacoes.last()
            if (atendimento == null && ultimaHigienizacao.status in ['6', '8', '9']) return 'H'
            if (ultimaHigienizacao.status == '5') return 'M'
            if (atendimento == null && 
                    ultimaHigienizacao.atendimento != null && 
                    ultimaHigienizacao.atendimento.dataAlta != null &&
                    ultimaHigienizacao.status in [null, '2', '3']) return 'A'
        }

        def interdicao = this.interdicaoLeitos.find {
            it.dataInicio >= new Date()
            new Date() <= it.dataFim
        }
        def reserva = this.reservaLeitos.find {
            it.dataInicio >= new Date()
            new Date() <= it.dataFim
        }
        if(interdicao) return 'I'

        if(reserva) return 'R'
        return 'L'
    }
}
