package br.com.hospitaldocoracaoal.aria

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic

@GrailsCompileStatic
@EqualsAndHashCode(includes = 'authority')
@ToString(includes = 'authority', includeNames = true, includePackage = false)
class Permissao implements Serializable {

    private static final long serialVersionUID = 1

    String authority
    String nome
    String alias

    static hasMany = [
            grupos: Grupo
    ]

    static belongsTo = [Grupo]

    static constraints = {
        authority nullable: false, blank: false, unique: true
        nome unique: true
        alias nullable: false
    }

    static void createPermissoes() {
        withTransaction { status ->
            // -- APACHE --
            findOrSaveWhere(authority: 'ROLE_APACHE_REPORT', nome: 'Ver relatório apache', alias: 'apache')
            findOrSaveWhere(authority: 'ROLE_APACHE_SAVE', nome: 'Salvar Apache', alias: 'apache')
            findOrSaveWhere(authority: 'ROLE_APACHE_SHOW', nome: 'Ver Apache', alias: 'apache')
            findOrSaveWhere(authority: 'ROLE_APACHE_UPDATE', nome: 'Atualizar Apache', alias: 'apache')

            // -- GRUPOS DE USUARIOS --
            findOrSaveWhere(authority: 'ROLE_GRUPO_INDEX', nome: 'Listar grupos de usuários', alias: 'grupo')
            findOrSaveWhere(authority: 'ROLE_GRUPO_SHOW', nome: 'Ver grupo de usuário', alias: 'grupo')
            findOrSaveWhere(authority: 'ROLE_GRUPO_SAVE', nome: 'Salvar grupo de usuário', alias: 'grupo')
            findOrSaveWhere(authority: 'ROLE_GRUPO_UPDATE', nome: 'Atualizar grupo de usuário', alias: 'grupo')
            findOrSaveWhere(authority: 'ROLE_GRUPO_DELETE', nome: 'Excluir grupo de usuário', alias: 'grupo')

            // -- SETOR --
            findOrSaveWhere(authority: 'ROLE_SETOR_INDEX', nome: 'Listar setores', alias: 'setor')
            findOrSaveWhere(authority: 'ROLE_SETOR_SHOW', nome: 'Ver setor', alias: 'setor')
            findOrSaveWhere(authority: 'ROLE_SETOR_SAVE', nome: 'Salvar setor', alias: 'setor')
            findOrSaveWhere(authority: 'ROLE_SETOR_UPDATE', nome: 'Atualizar setor', alias: 'setor')
            findOrSaveWhere(authority: 'ROLE_SETOR_DELETE', nome: 'Excluir setor', alias: 'setor')

            // -- SETOR WPD --
            findOrSaveWhere(authority: 'ROLE_SETOR_WPD_INDEX', nome: 'Listar setores do wpd', alias: 'setor wpd')
            findOrSaveWhere(authority: 'ROLE_SETOR_WPD_SHOW', nome: 'Ver setor do wpd', alias: 'setor wpd')

            // -- PERFIL --
            findOrSaveWhere(authority: 'ROLE_PERFIL_EPIDEMIOLOGICO_INDEX', nome: 'Listar Perfis Epidemiológicos', alias: 'perfil epidemiológico')

            // -- PACIENTE --
            findOrSaveWhere(authority: 'ROLE_PACIENTE_INDEX', nome: 'Listar Pacientes', alias: 'paciente')
            findOrSaveWhere(authority: 'ROLE_PACIENTE_SHOW', nome: 'Ver Paciente', alias: 'paciente')

            // -- REGISTRO DE ATENDIMENTO --
            findOrSaveWhere(authority: 'ROLE_REGISTRO_ATENDIMENTO_INDEX', nome: 'Listar Registros de Atendimento', alias: 'registro de atendimento')
            findOrSaveWhere(authority: 'ROLE_REGISTRO_ATENDIMENTO_SHOW', nome: 'Ver Registros de Atendimento', alias: 'registro de atendimento')

            // -- USUARIO --
            findOrSaveWhere(authority: 'ROLE_USUARIO_SHOW', nome: 'Ver usuário', alias: 'usuario')
            findOrSaveWhere(authority: 'ROLE_USUARIO_INDEX', nome: 'Listar usuários', alias: 'usuario')
            findOrSaveWhere(authority: 'ROLE_USUARIO_UPDATE', nome: 'Atualizar usuário', alias: 'usuario')

            // -- PERMISSAO --
            findOrSaveWhere(authority: 'ROLE_PERMISSAO_INDEX', nome: 'Listar Permissões', alias: 'permissao')
        }
    }
}
