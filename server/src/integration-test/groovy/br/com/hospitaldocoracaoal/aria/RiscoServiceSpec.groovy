package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class RiscoServiceSpec extends Specification {

    RiscoService riscoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Risco(...).save(flush: true, failOnError: true)
        //new Risco(...).save(flush: true, failOnError: true)
        //Risco risco = new Risco(...).save(flush: true, failOnError: true)
        //new Risco(...).save(flush: true, failOnError: true)
        //new Risco(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //risco.id
    }

    void "test get"() {
        setupData()

        expect:
        riscoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Risco> riscoList = riscoService.list(max: 2, offset: 2)

        then:
        riscoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        riscoService.count() == 5
    }

    void "test delete"() {
        Long riscoId = setupData()

        expect:
        riscoService.count() == 5

        when:
        riscoService.delete(riscoId)
        sessionFactory.currentSession.flush()

        then:
        riscoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Risco risco = new Risco()
        riscoService.save(risco)

        then:
        risco.id != null
    }
}
