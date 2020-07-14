package br.com.hospitaldocoracaoal.integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class CidServiceSpec extends Specification {

    CidService cidService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Cid(...).save(flush: true, failOnError: true)
        //new Cid(...).save(flush: true, failOnError: true)
        //Cid cid = new Cid(...).save(flush: true, failOnError: true)
        //new Cid(...).save(flush: true, failOnError: true)
        //new Cid(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //cid.id
    }

    void "test get"() {
        setupData()

        expect:
        cidService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Cid> cidList = cidService.list(max: 2, offset: 2)

        then:
        cidList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        cidService.count() == 5
    }

    void "test delete"() {
        Long cidId = setupData()

        expect:
        cidService.count() == 5

        when:
        cidService.delete(cidId)
        sessionFactory.currentSession.flush()

        then:
        cidService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Cid cid = new Cid()
        cidService.save(cid)

        then:
        cid.id != null
    }
}
