package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class EstratificacaoRiscoServiceSpec extends Specification {

    EstratificacaoRiscoService estratificacaoRiscoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new EstratificacaoRisco(...).save(flush: true, failOnError: true)
        //new EstratificacaoRisco(...).save(flush: true, failOnError: true)
        //EstratificacaoRisco estratificacaoRisco = new EstratificacaoRisco(...).save(flush: true, failOnError: true)
        //new EstratificacaoRisco(...).save(flush: true, failOnError: true)
        //new EstratificacaoRisco(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //estratificacaoRisco.id
    }

    void "test get"() {
        setupData()

        expect:
        estratificacaoRiscoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<EstratificacaoRisco> estratificacaoRiscoList = estratificacaoRiscoService.list(max: 2, offset: 2)

        then:
        estratificacaoRiscoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        estratificacaoRiscoService.count() == 5
    }

    void "test delete"() {
        Long estratificacaoRiscoId = setupData()

        expect:
        estratificacaoRiscoService.count() == 5

        when:
        estratificacaoRiscoService.delete(estratificacaoRiscoId)
        sessionFactory.currentSession.flush()

        then:
        estratificacaoRiscoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        EstratificacaoRisco estratificacaoRisco = new EstratificacaoRisco()
        estratificacaoRiscoService.save(estratificacaoRisco)

        then:
        estratificacaoRisco.id != null
    }
}
