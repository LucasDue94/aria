package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PlanoTerapeuticoServiceSpec extends Specification {

    PlanoTerapeuticoService planoTerapeuticoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new PlanoTerapeutico(...).save(flush: true, failOnError: true)
        //new PlanoTerapeutico(...).save(flush: true, failOnError: true)
        //PlanoTerapeutico planoTerapeutico = new PlanoTerapeutico(...).save(flush: true, failOnError: true)
        //new PlanoTerapeutico(...).save(flush: true, failOnError: true)
        //new PlanoTerapeutico(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //planoTerapeutico.id
    }

    void "test get"() {
        setupData()

        expect:
        planoTerapeuticoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<PlanoTerapeutico> planoTerapeuticoList = planoTerapeuticoService.list(max: 2, offset: 2)

        then:
        planoTerapeuticoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        planoTerapeuticoService.count() == 5
    }

    void "test delete"() {
        Long planoTerapeuticoId = setupData()

        expect:
        planoTerapeuticoService.count() == 5

        when:
        planoTerapeuticoService.delete(planoTerapeuticoId)
        sessionFactory.currentSession.flush()

        then:
        planoTerapeuticoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        PlanoTerapeutico planoTerapeutico = new PlanoTerapeutico()
        planoTerapeuticoService.save(planoTerapeutico)

        then:
        planoTerapeutico.id != null
    }
}
