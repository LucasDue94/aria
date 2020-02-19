package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class BalaoServiceSpec extends Specification {

    BalaoService balaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Balao(...).save(flush: true, failOnError: true)
        //new Balao(...).save(flush: true, failOnError: true)
        //Balao balao = new Balao(...).save(flush: true, failOnError: true)
        //new Balao(...).save(flush: true, failOnError: true)
        //new Balao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //balao.id
    }

    void "test get"() {
        setupData()

        expect:
        balaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Balao> balaoList = balaoService.list(max: 2, offset: 2)

        then:
        balaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        balaoService.count() == 5
    }

    void "test delete"() {
        Long balaoId = setupData()

        expect:
        balaoService.count() == 5

        when:
        balaoService.delete(balaoId)
        sessionFactory.currentSession.flush()

        then:
        balaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Balao balao = new Balao()
        balaoService.save(balao)

        then:
        balao.id != null
    }
}
