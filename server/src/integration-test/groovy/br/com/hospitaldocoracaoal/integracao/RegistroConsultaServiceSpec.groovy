package br.com.hospitaldocoracaoal.integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class RegistroConsultaServiceSpec extends Specification {

    AtendimentoService registroAtendimentoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new RegistroAtendimento(...).save(flush: true, failOnError: true)
        //new RegistroAtendimento(...).save(flush: true, failOnError: true)
        //RegistroAtendimento registroAtendimento = new RegistroAtendimento(...).save(flush: true, failOnError: true)
        //new RegistroAtendimento(...).save(flush: true, failOnError: true)
        //new RegistroAtendimento(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //registroAtendimento.id
    }

    void "test get"() {
        setupData()

        expect:
        registroAtendimentoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Atendimento> registroAtendimentoList = registroAtendimentoService.list(max: 2, offset: 2)

        then:
        registroAtendimentoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        registroAtendimentoService.count() == 5
    }

    void "test delete"() {
        Long registroAtendimentoId = setupData()

        expect:
        registroAtendimentoService.count() == 5

        when:
        registroAtendimentoService.delete(registroAtendimentoId)
        sessionFactory.currentSession.flush()

        then:
        registroAtendimentoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Atendimento registroAtendimento = new Atendimento()
        registroAtendimentoService.save(registroAtendimento)

        then:
        registroAtendimento.id != null
    }
}
