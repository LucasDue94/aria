package br.com.hospitaldocoracaoal.aria


import grails.gorm.services.Service

@Service(Balao)
abstract class BalaoService {

    abstract Balao get(Serializable id)

    abstract List<Balao> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Balao save(Balao balao)

    def gerarBalao() {
        def ecgs = Ecg.findAll()
        def baloes = Balao.findAll()
        def atendimentos = []
        Calendar c = new GregorianCalendar()

        List<Boolean> balaoLimite = []

        ecgs.each { Ecg e ->
            c.setTime(e.dataHoraPorta)
            c.add(Calendar.MINUTE, 90)

            balaoLimite = baloes.each { b -> b.registroAtendimento.paciente.id == e.registroAtendimento.paciente.id}
                    .collect { Balao b -> b.dataHoraBalao <= c.time }
        }

        atendimentos << [atendidos: balaoLimite.count { limite -> limite }, naoAtendidos: balaoLimite.count { limite -> !limite }]

        return atendimentos
    }
}
