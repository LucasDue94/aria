package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class AdmissaoServiceSpec extends Specification {

    AdmissaoService admissaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Admissao(...).save(flush: true, failOnError: true)
        //new Admissao(...).save(flush: true, failOnError: true)
        //Admissao admissao = new Admissao(...).save(flush: true, failOnError: true)
        //new Admissao(...).save(flush: true, failOnError: true)
        //new Admissao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //admissao.id
    }

    void "test get"() {
        setupData()

        expect:
        admissaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Admissao> admissaoList = admissaoService.list(max: 2, offset: 2)

        then:
        admissaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        admissaoService.count() == 5
    }

    void "test delete"() {
        Long admissaoId = setupData()

        expect:
        admissaoService.count() == 5

        when:
        admissaoService.delete(admissaoId)
        sessionFactory.currentSession.flush()

        then:
        admissaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Admissao admissao = new Admissao()
        admissaoService.save(admissao)

        then:
        admissao.id != null
    }
}
