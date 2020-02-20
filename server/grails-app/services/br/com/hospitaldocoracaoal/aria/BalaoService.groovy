package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import grails.gorm.services.Service
import grails.validation.ValidationException

@Service(Balao)
abstract class BalaoService {

    abstract Balao get(Serializable id)

    abstract List<Balao> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    def save(Balao balao) {

        def criteria = RegistroAtendimento.createCriteria()
        List<RegistroAtendimento> registros = (List<RegistroAtendimento>) criteria.list() {
            eq 'tipo', RegistroAtendimento.TIPO_EMERGENCIA
            eq 'paciente.id', balao.registroAtendimento.paciente.id
            le 'dataEntrada', balao.registroAtendimento.dataEntrada
        } as List<RegistroAtendimento>

        if (registros.last().ecg != null) {
            balao.save()
        } else {
            balao.errors.reject(
                    'ecocardiograma.registroAtendimento.doesnt.exist',
                    'Ecocardiograma não encontrado.'
            )
            throw new ValidationException('Paciente não tem ecg cadastrado.', balao.errors)
        }
    }

    def gerarBalao() {
        def ecgs = Ecg.findAll()
        def baloes = Balao.findAll()
        def atendimentos = []
        Calendar c = new GregorianCalendar()

        List<Boolean> balaoLimite = []

        ecgs.each { Ecg e ->
            c.setTime(e.dataHoraPorta)
            c.add(Calendar.MINUTE, 90)

            balaoLimite = baloes.each { b -> b.registroAtendimento.paciente.id == e.registroAtendimento.paciente.id }
                    .collect { Balao b -> b.dataHoraBalao <= c.time }
        }

        atendimentos << [atendidos: balaoLimite.count { limite -> limite }, naoAtendidos: balaoLimite.count { limite -> !limite }]

        return atendimentos
    }
}
