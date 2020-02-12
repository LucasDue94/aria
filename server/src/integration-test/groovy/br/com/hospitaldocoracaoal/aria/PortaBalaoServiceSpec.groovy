package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PortaBalaoServiceSpec extends Specification {

    PortaBalaoService portaBalaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new PortaBalao(...).save(flush: true, failOnError: true)
        //new PortaBalao(...).save(flush: true, failOnError: true)
        //PortaBalao portaBalao = new PortaBalao(...).save(flush: true, failOnError: true)
        //new PortaBalao(...).save(flush: true, failOnError: true)
        //new PortaBalao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //portaBalao.id
    }

    void "test get"() {
        setupData()

        expect:
        portaBalaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<PortaBalao> portaBalaoList = portaBalaoService.list(max: 2, offset: 2)

        then:
        portaBalaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        portaBalaoService.count() == 5
    }

    void "test delete"() {
        Long portaBalaoId = setupData()

        expect:
        portaBalaoService.count() == 5

        when:
        portaBalaoService.delete(portaBalaoId)
        sessionFactory.currentSession.flush()

        then:
        portaBalaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        PortaBalao portaBalao = new PortaBalao()
        portaBalaoService.save(portaBalao)

        then:
        portaBalao.id != null
    }
}
