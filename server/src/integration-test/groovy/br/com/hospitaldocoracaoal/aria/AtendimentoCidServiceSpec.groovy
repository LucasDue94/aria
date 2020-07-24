package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class AtendimentoCidServiceSpec extends Specification {

    AtendimentoCidService atendimentoCidService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new AtendimentoCid(...).save(flush: true, failOnError: true)
        //new AtendimentoCid(...).save(flush: true, failOnError: true)
        //AtendimentoCid atendimentoCid = new AtendimentoCid(...).save(flush: true, failOnError: true)
        //new AtendimentoCid(...).save(flush: true, failOnError: true)
        //new AtendimentoCid(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //atendimentoCid.id
    }

    void "test get"() {
        setupData()

        expect:
        atendimentoCidService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<AtendimentoCid> atendimentoCidList = atendimentoCidService.list(max: 2, offset: 2)

        then:
        atendimentoCidList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        atendimentoCidService.count() == 5
    }

    void "test delete"() {
        Long atendimentoCidId = setupData()

        expect:
        atendimentoCidService.count() == 5

        when:
        atendimentoCidService.delete(atendimentoCidId)
        sessionFactory.currentSession.flush()

        then:
        atendimentoCidService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        AtendimentoCid atendimentoCid = new AtendimentoCid()
        atendimentoCidService.save(atendimentoCid)

        then:
        atendimentoCid.id != null
    }
}
