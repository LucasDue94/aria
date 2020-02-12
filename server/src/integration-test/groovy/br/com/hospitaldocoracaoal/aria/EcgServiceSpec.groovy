package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class EcgServiceSpec extends Specification {

    EcgService ecgService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Ecg(...).save(flush: true, failOnError: true)
        //new Ecg(...).save(flush: true, failOnError: true)
        //Ecg ecg = new Ecg(...).save(flush: true, failOnError: true)
        //new Ecg(...).save(flush: true, failOnError: true)
        //new Ecg(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //ecg.id
    }

    void "test get"() {
        setupData()

        expect:
        ecgService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Ecg> ecgList = ecgService.list(max: 2, offset: 2)

        then:
        ecgList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        ecgService.count() == 5
    }

    void "test delete"() {
        Long ecgId = setupData()

        expect:
        ecgService.count() == 5

        when:
        ecgService.delete(ecgId)
        sessionFactory.currentSession.flush()

        then:
        ecgService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Ecg ecg = new Ecg()
        ecgService.save(ecg)

        then:
        ecg.id != null
    }
}
