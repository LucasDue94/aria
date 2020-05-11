package br.com.hospitaldocoracaoal.integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class LeitoServiceSpec extends Specification {

    LeitoService leitoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Leito(...).save(flush: true, failOnError: true)
        //new Leito(...).save(flush: true, failOnError: true)
        //Leito leito = new Leito(...).save(flush: true, failOnError: true)
        //new Leito(...).save(flush: true, failOnError: true)
        //new Leito(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //leito.id
    }

    void "test get"() {
        setupData()

        expect:
        leitoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Leito> leitoList = leitoService.list(max: 2, offset: 2)

        then:
        leitoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        leitoService.count() == 5
    }

    void "test delete"() {
        Long leitoId = setupData()

        expect:
        leitoService.count() == 5

        when:
        leitoService.delete(leitoId)
        sessionFactory.currentSession.flush()

        then:
        leitoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Leito leito = new Leito()
        leitoService.save(leito)

        then:
        leito.id != null
    }
}
