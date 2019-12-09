package br.com.hospitaldocoracaoal.aria

import grails.plugin.springsecurity.rest.token.AccessToken
import grails.plugin.springsecurity.rest.token.rendering.AccessTokenJsonRenderer
import groovy.json.JsonBuilder

class CustomAccessTokenRenderer implements AccessTokenJsonRenderer {

    @Override
    String generateJson(AccessToken accessToken) {
        Map response = [
                id: accessToken.principal.id,
                nome: accessToken.principal.nome,
                grupo: accessToken.principal.grupo,
                username: accessToken.principal.username,
                access_token: accessToken.accessToken,
                roles: accessToken.principal.authorities.collect{ it.authority }
        ]

        return new JsonBuilder(response).toPrettyString()
    }
}
