package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class EvolucaoServiceSpec extends Specification {

    EvolucaoService evolucaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Evolucao(...).save(flush: true, failOnError: true)
        //new Evolucao(...).save(flush: true, failOnError: true)
        //Evolucao evolucao = new Evolucao(...).save(flush: true, failOnError: true)
        //new Evolucao(...).save(flush: true, failOnError: true)
        //new Evolucao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //evolucao.id
    }

    void "test get"() {
        setupData()

        expect:
        evolucaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Evolucao> evolucaoList = evolucaoService.list(max: 2, offset: 2)

        then:
        evolucaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        evolucaoService.count() == 5
    }

    void "test delete"() {
        Long evolucaoId = setupData()

        expect:
        evolucaoService.count() == 5

        when:
        evolucaoService.delete(evolucaoId)
        sessionFactory.currentSession.flush()

        then:
        evolucaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Evolucao evolucao = new Evolucao()
        evolucaoService.save(evolucao)

        then:
        evolucao.id != null
    }
}
