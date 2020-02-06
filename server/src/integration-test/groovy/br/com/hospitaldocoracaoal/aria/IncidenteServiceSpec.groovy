package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class IncidenteServiceSpec extends Specification {

    IncidenteService incidenteService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Incidente(...).save(flush: true, failOnError: true)
        //new Incidente(...).save(flush: true, failOnError: true)
        //Incidente incidente = new Incidente(...).save(flush: true, failOnError: true)
        //new Incidente(...).save(flush: true, failOnError: true)
        //new Incidente(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //incidente.id
    }

    void "test get"() {
        setupData()

        expect:
        incidenteService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Incidente> incidenteList = incidenteService.list(max: 2, offset: 2)

        then:
        incidenteList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        incidenteService.count() == 5
    }

    void "test delete"() {
        Long incidenteId = setupData()

        expect:
        incidenteService.count() == 5

        when:
        incidenteService.delete(incidenteId)
        sessionFactory.currentSession.flush()

        then:
        incidenteService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Incidente incidente = new Incidente()
        incidenteService.save(incidente)

        then:
        incidente.id != null
    }
}
