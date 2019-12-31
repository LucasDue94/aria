package br.com.hospitaldocoracaoal.aria

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PermissaoServiceSpec extends Specification {

    PermissaoService permissaoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Permissao(...).save(flush: true, failOnError: true)
        //new Permissao(...).save(flush: true, failOnError: true)
        //Permissao permissao = new Permissao(...).save(flush: true, failOnError: true)
        //new Permissao(...).save(flush: true, failOnError: true)
        //new Permissao(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //permissao.id
    }

    void "test get"() {
        setupData()

        expect:
        permissaoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Permissao> permissaoList = permissaoService.list(max: 2, offset: 2)

        then:
        permissaoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        permissaoService.count() == 5
    }

    void "test delete"() {
        Long permissaoId = setupData()

        expect:
        permissaoService.count() == 5

        when:
        permissaoService.delete(permissaoId)
        sessionFactory.currentSession.flush()

        then:
        permissaoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Permissao permissao = new Permissao()
        permissaoService.save(permissao)

        then:
        permissao.id != null
    }
}
