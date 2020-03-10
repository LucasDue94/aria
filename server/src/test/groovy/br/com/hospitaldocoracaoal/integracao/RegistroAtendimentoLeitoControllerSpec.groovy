package br.com.hospitaldocoracaoal.integracao

import spock.lang.*
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY
import grails.validation.ValidationException
import grails.testing.web.controllers.ControllerUnitTest
import grails.testing.gorm.DomainUnitTest

class RegistroAtendimentoLeitoControllerSpec extends Specification implements ControllerUnitTest<RegistroAtendimentoLeitoController>, DomainUnitTest<RegistroAtendimentoLeito> {

    def populateValidParams(params) {
        assert params != null

        // TODO: Populate valid properties like...
        //params["name"] = 'someValidName'
        assert false, "TODO: Provide a populateValidParams() implementation for this generated test suite"
    }

    void "Test the index action returns the correct response"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * list(_) >> []
            1 * count() >> 0
        }

        when:"The index action is executed"
            controller.index()

        then:"The response is correct"
            response.text == '[]'
    }


    void "Test the save action with a null instance"() {
        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'POST'
        controller.save()

        then:
        response.status == UNPROCESSABLE_ENTITY.value()
    }

    void "Test the save action correctly persists"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * save(_ as RegistroAtendimentoLeito)
        }

        when:
        response.reset()
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'POST'
        populateValidParams(params)
        request.json = new RegistroAtendimentoLeito(params)
        controller.save()

        then:
        response.status == CREATED.value()
        response.json
    }

    void "Test the save action with an invalid instance"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * save(_ as RegistroAtendimentoLeito) >> { RegistroAtendimentoLeito registroAtendimentoLeito ->
                throw new ValidationException("Invalid instance", registroAtendimentoLeito.errors)
            }
        }

        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'POST'
        populateValidParams(params)
        request.json = new RegistroAtendimentoLeito(params)
        controller.save()

        then:
        response.status == UNPROCESSABLE_ENTITY.value()
        response.json
    }

    void "Test the show action with a null id"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * get(null) >> null
        }

        when:"The show action is executed with a null domain"
        controller.show()

        then:"A 404 error is returned"
        response.status == NOT_FOUND.value()
    }

    void "Test the show action with a valid id"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * get(2) >> new RegistroAtendimentoLeito()
        }

        when:"A domain instance is passed to the show action"
        params.id = 2
        controller.show()

        then:"A model is populated containing the domain instance"
        response.status == OK.value()
        response.json == [:]
    }

    void "Test the update action with a null instance"() {
        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'PUT'
        controller.update()

        then:
        response.status == UNPROCESSABLE_ENTITY.value()
    }

    void "Test the update action correctly persists"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * save(_ as RegistroAtendimentoLeito)
        }

        when:
        response.reset()
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'PUT'
        populateValidParams(params)
        def instance = new RegistroAtendimentoLeito(params)
        instance.id = 1
        instance.version = 0
        controller.update(instance)

        then:
        response.status == OK.value()
        response.json
    }

    void "Test the update action with an invalid instance"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * save(_ as RegistroAtendimentoLeito) >> { RegistroAtendimentoLeito registroAtendimentoLeito ->
                throw new ValidationException("Invalid instance", registroAtendimentoLeito.errors)
            }
        }

        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'PUT'
        def instance = new RegistroAtendimentoLeito(params)
        instance.id = 1
        instance.version = 0
        controller.update(instance)

        then:
        response.status == UNPROCESSABLE_ENTITY.value()
        response.json
    }

    void "Test the delete action with a null instance"() {
        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'DELETE'
        controller.delete()

        then:
        response.status == NOT_FOUND.value()
    }

    void "Test the delete action with an instance"() {
        given:
        controller.registroAtendimentoLeitoService = Mock(RegistroAtendimentoLeitoService) {
            1 * delete(2)
        }

        when:
        request.contentType = JSON_CONTENT_TYPE
        request.method = 'DELETE'
        params.id = 2
        controller.delete()

        then:
        response.status == NO_CONTENT.value()
    }
}