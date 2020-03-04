package br.com.hospitaldocoracaoal.integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class RegistroAtendimentoLeitoServiceSpec extends Specification {

    RegistroAtendimentoLeitoService registroAtendimentoLeitoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new RegistroAtendimentoLeito(...).save(flush: true, failOnError: true)
        //new RegistroAtendimentoLeito(...).save(flush: true, failOnError: true)
        //RegistroAtendimentoLeito registroAtendimentoLeito = new RegistroAtendimentoLeito(...).save(flush: true, failOnError: true)
        //new RegistroAtendimentoLeito(...).save(flush: true, failOnError: true)
        //new RegistroAtendimentoLeito(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //registroAtendimentoLeito.id
    }

    void "test get"() {
        setupData()

        expect:
        registroAtendimentoLeitoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<RegistroAtendimentoLeito> registroAtendimentoLeitoList = registroAtendimentoLeitoService.list(max: 2, offset: 2)

        then:
        registroAtendimentoLeitoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        registroAtendimentoLeitoService.count() == 5
    }

    void "test delete"() {
        Long registroAtendimentoLeitoId = setupData()

        expect:
        registroAtendimentoLeitoService.count() == 5

        when:
        registroAtendimentoLeitoService.delete(registroAtendimentoLeitoId)
        sessionFactory.currentSession.flush()

        then:
        registroAtendimentoLeitoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        RegistroAtendimentoLeito registroAtendimentoLeito = new RegistroAtendimentoLeito()
        registroAtendimentoLeitoService.save(registroAtendimentoLeito)

        then:
        registroAtendimentoLeito.id != null
    }
}
