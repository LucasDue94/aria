package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class NasServiceSpec extends Specification {

    NasService nasService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Nas(...).save(flush: true, failOnError: true)
        //new Nas(...).save(flush: true, failOnError: true)
        //Nas nas = new Nas(...).save(flush: true, failOnError: true)
        //new Nas(...).save(flush: true, failOnError: true)
        //new Nas(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //nas.id
    }

    void "test get"() {
        setupData()

        expect:
        nasService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Nas> nasList = nasService.list(max: 2, offset: 2)

        then:
        nasList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        nasService.count() == 5
    }

    void "test delete"() {
        Long nasId = setupData()

        expect:
        nasService.count() == 5

        when:
        nasService.delete(nasId)
        sessionFactory.currentSession.flush()

        then:
        nasService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Nas nas = new Nas()
        nasService.save(nas)

        then:
        nas.id != null
    }
}
