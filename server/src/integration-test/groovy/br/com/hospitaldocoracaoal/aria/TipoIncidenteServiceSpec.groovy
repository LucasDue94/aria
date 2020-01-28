package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class TipoIncidenteServiceSpec extends Specification {

    TipoIncidenteService tipoIncidenteService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new TipoIncidente(...).save(flush: true, failOnError: true)
        //new TipoIncidente(...).save(flush: true, failOnError: true)
        //TipoIncidente tipoIncidente = new TipoIncidente(...).save(flush: true, failOnError: true)
        //new TipoIncidente(...).save(flush: true, failOnError: true)
        //new TipoIncidente(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //tipoIncidente.id
    }

    void "test get"() {
        setupData()

        expect:
        tipoIncidenteService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<TipoIncidente> tipoIncidenteList = tipoIncidenteService.list(max: 2, offset: 2)

        then:
        tipoIncidenteList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        tipoIncidenteService.count() == 5
    }

    void "test delete"() {
        Long tipoIncidenteId = setupData()

        expect:
        tipoIncidenteService.count() == 5

        when:
        tipoIncidenteService.delete(tipoIncidenteId)
        sessionFactory.currentSession.flush()

        then:
        tipoIncidenteService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        TipoIncidente tipoIncidente = new TipoIncidente()
        tipoIncidenteService.save(tipoIncidente)

        then:
        tipoIncidente.id != null
    }
}
