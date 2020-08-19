package br.com.hospitaldocoracaoal.aria

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

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
            //PLANO TERAPEUTICO --
            findOrSaveWhere(authority: 'ROLE_PLANO_TERAPEUTICO_INDEX', nome: 'Listar plano terapeutico', alias: 'planoTerapeutico')
            findOrSaveWhere(authority: 'ROLE_PLANO_TERAPEUTICO_SAVE', nome: 'Salvar plano terapeutico', alias: 'planoTerapeutico')
            findOrSaveWhere(authority: 'ROLE_PLANO_TERAPEUTICO_SHOW', nome: 'Ver plano terapeutico', alias: 'planoTerapeutico')
            findOrSaveWhere(authority: 'ROLE_PLANO_TERAPEUTICO_UPDATE', nome: 'Atualizar plano terapeutico', alias: 'planoTerapeutico')

            // -- APACHE --
            findOrSaveWhere(authority: 'ROLE_APACHE_REPORT', nome: 'Ver relatório apache', alias: 'apache')
            findOrSaveWhere(authority: 'ROLE_APACHE_SAVE', nome: 'Salvar Apache', alias: 'apache')
            findOrSaveWhere(authority: 'ROLE_APACHE_SHOW', nome: 'Ver Apache', alias: 'apache')
            findOrSaveWhere(authority: 'ROLE_APACHE_UPDATE', nome: 'Atualizar Apache', alias: 'apache')

            // -- DIAGNOSTICO --
            findOrSaveWhere(authority: 'ROLE_DIAGNOSTICO_REPORT', nome: 'Ver relatório Diagnostico', alias: 'Diagnostico')
            findOrSaveWhere(authority: 'ROLE_DIAGNOSTICO_SAVE', nome: 'Salvar Diagnostico', alias: 'Diagnostico')
            findOrSaveWhere(authority: 'ROLE_DIAGNOSTICO_SHOW', nome: 'Ver Diagnostico', alias: 'Diagnostico')
            findOrSaveWhere(authority: 'ROLE_DIAGNOSTICO_UPDATE', nome: 'Atualizar Diagnostico', alias: 'Diagnostico')
            findOrSaveWhere(authority: 'ROLE_DIAGNOSTICO_DELETE', nome: 'Excluir Diagnostico', alias: 'Diagnostico')

            // -- CID --
            findOrSaveWhere(authority: 'ROLE_CID_INDEX', nome: 'LISTA DE CIDs', alias: 'CID')
            findOrSaveWhere(authority: 'ROLE_CID_SHOW', nome: 'Ver CID', alias: 'CID')


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
            findOrSaveWhere(authority: 'ROLE_SETOR_VER_MENU', nome: 'Ver menu setor', alias: 'Ver menu setor')


            // -- PERFIL --
            findOrSaveWhere(authority: 'ROLE_PERFIL_EPIDEMIOLOGICO_INDEX', nome: 'Listar Perfis Epidemiológicos', alias: 'perfil epidemiológico')

            // -- PACIENTE --
            findOrSaveWhere(authority: 'ROLE_PACIENTE_INDEX', nome: 'Listar Pacientes', alias: 'paciente')
            findOrSaveWhere(authority: 'ROLE_PACIENTE_SHOW', nome: 'Ver Paciente', alias: 'paciente')

            // -- ATENDIMENTO --
            findOrSaveWhere(authority: 'ROLE_ATENDIMENTO_INDEX', nome: 'Listar Atendimentos', alias: 'atendimento')
            findOrSaveWhere(authority: 'ROLE_ATENDIMENTO_SAVE', nome: 'Salvar Atendimentos', alias: 'atendimento')
            findOrSaveWhere(authority: 'ROLE_ATENDIMENTO_UPDATE', nome: 'Atualizar Atendimentos', alias: 'atendimento')
            findOrSaveWhere(authority: 'ROLE_ATENDIMENTO_SHOW', nome: 'Ver Atendimento', alias: 'atendimento')

            // -- ADMISSAO --
            findOrSaveWhere(authority: 'ROLE_ADMISSAO_INDEX', nome: 'Listar Admissao', alias: 'admissao')
            findOrSaveWhere(authority: 'ROLE_ADMISSAO_SAVE', nome: 'Salvar Admissao', alias: 'admissao')
            findOrSaveWhere(authority: 'ROLE_ADMISSAO_UPDATE', nome: 'Atualizar Admissao', alias: 'admissao')
            findOrSaveWhere(authority: 'ROLE_ADMISSAO_SHOW', nome: 'Ver Admissao', alias: 'admissao')

            // -- USUARIO --
            findOrSaveWhere(authority: 'ROLE_USUARIO_SHOW', nome: 'Ver usuário', alias: 'usuario')
            findOrSaveWhere(authority: 'ROLE_USUARIO_INDEX', nome: 'Listar usuários', alias: 'usuario')
            findOrSaveWhere(authority: 'ROLE_USUARIO_UPDATE', nome: 'Atualizar usuário', alias: 'usuario')

            // -- PERMISSAO --
            findOrSaveWhere(authority: 'ROLE_PERMISSAO_INDEX', nome: 'Listar Permissões', alias: 'permissao')

            // -- RISCO --
            findOrSaveWhere(authority: 'ROLE_RISCO_INDEX', nome: 'Listar riscos', alias: 'risco')
            findOrSaveWhere(authority: 'ROLE_RISCO_SHOW', nome: 'Ver risco', alias: 'risco')
            findOrSaveWhere(authority: 'ROLE_RISCO_SAVE', nome: 'Salvar risco', alias: 'risco')
            findOrSaveWhere(authority: 'ROLE_RISCO_UPDATE', nome: 'Atualizar risco', alias: 'risco')
            findOrSaveWhere(authority: 'ROLE_RISCO_DELETE', nome: 'Excluir risco', alias: 'risco')

            // -- TIPO INCIDENTE --
            findOrSaveWhere(authority: 'ROLE_TIPO_INCIDENTE_INDEX', nome: 'Listar tipos de incidente', alias: 'tipo de incidente')
            findOrSaveWhere(authority: 'ROLE_TIPO_INCIDENTE_SHOW', nome: 'Ver tipo de incidente', alias: 'tipo de incidente')
            findOrSaveWhere(authority: 'ROLE_TIPO_INCIDENTE_SAVE', nome: 'Salvar tipo de incidente', alias: 'tipo de incidente')
            findOrSaveWhere(authority: 'ROLE_TIPO_INCIDENTE_UPDATE', nome: 'Atualizar tipo de incidente', alias: 'tipo de incidente')
            findOrSaveWhere(authority: 'ROLE_TIPO_INCIDENTE_DELETE', nome: 'Excluir tipo de incidente', alias: 'tipo de incidente')

            // -- BALAO
            findOrSaveWhere(authority: 'ROLE_BALAO_INDEX', nome: 'Listar porta balão', alias: 'porta balão')
            findOrSaveWhere(authority: 'ROLE_BALAO_SHOW', nome: 'Ver porta balão', alias: 'porta balão')
            findOrSaveWhere(authority: 'ROLE_BALAO_SAVE', nome: 'Salvar porta balão', alias: 'porta balão')
            findOrSaveWhere(authority: 'ROLE_BALAO_UPDATE', nome: 'Atualizar porta balão', alias: 'porta balão')
            findOrSaveWhere(authority: 'ROLE_BALAO_DELETE', nome: 'Excluir porta balão', alias: 'porta balão')

            // -- ECG
            findOrSaveWhere(authority: 'ROLE_ECG_INDEX', nome: 'Listar ecg', alias: 'ecocardiograma')
            findOrSaveWhere(authority: 'ROLE_ECG_SHOW', nome: 'Ver ecg', alias: 'ecocardiograma')
            findOrSaveWhere(authority: 'ROLE_ECG_SAVE', nome: 'Salvar ecg', alias: 'ecocardiograma')
            findOrSaveWhere(authority: 'ROLE_ECG_UPDATE', nome: 'Atualizar ecg', alias: 'ecocardiograma')
            findOrSaveWhere(authority: 'ROLE_ECG_DELETE', nome: 'Excluir ecg', alias: 'ecocardiograma')

            // -- INCIDENTE --
            findOrSaveWhere(authority: 'ROLE_INCIDENTE_INDEX', nome: 'Listar incidentes', alias: 'incidentes')
            findOrSaveWhere(authority: 'ROLE_INCIDENTE_SHOW', nome: 'Ver incidente', alias: 'incidente')
            findOrSaveWhere(authority: 'ROLE_INCIDENTE_SAVE', nome: 'Salvar incidente', alias: 'incidente')
            findOrSaveWhere(authority: 'ROLE_INCIDENTE_UPDATE', nome: 'Atualizar incidente', alias: 'incidente')
            findOrSaveWhere(authority: 'ROLE_INCIDENTE_DELETE', nome: 'Excluir incidente', alias: 'incidente')
            findOrSaveWhere(authority: 'ROLE_INCIDENTE_REPORT', nome: 'Relatório incidente', alias: 'incidente')

            // -- ESTRATIFICACAO DE RISCO --
            findOrSaveWhere(authority: 'ROLE_ESTRATIFICACAO_INDEX', nome: 'Listar estratificações de risco', alias: 'estratificação risco')
            findOrSaveWhere(authority: 'ROLE_ESTRATIFICACAO_SHOW', nome: 'Ver estratificação de risco', alias: 'estratificação risco')
            findOrSaveWhere(authority: 'ROLE_ESTRATIFICACAO_SAVE', nome: 'Salvar estratificação de risco', alias: 'estratificação risco')
            findOrSaveWhere(authority: 'ROLE_ESTRATIFICACAO_UPDATE', nome: 'Atualizar estratificação de risco', alias: 'estratificação risco')
            findOrSaveWhere(authority: 'ROLE_ESTRATIFICACAO_DELETE', nome: 'Excluir estratificação de risco', alias: 'estratificação risco')
            findOrSaveWhere(authority: 'ROLE_ESTRATIFICACAO_REPORT', nome: 'Relatório estratificação de risco', alias: 'estratificação risco')

            // -- EVOLUCAO --
            findOrSaveWhere(authority: 'ROLE_EVOLUCAO_INDEX', nome: 'Listar evoluções', alias: 'evolução')
            findOrSaveWhere(authority: 'ROLE_EVOLUCAO_SHOW', nome: 'Ver evolução', alias: 'evolução')
            findOrSaveWhere(authority: 'ROLE_EVOLUCAO_SAVE', nome: 'Salvar evolução', alias: 'evolução')
            findOrSaveWhere(authority: 'ROLE_EVOLUCAO_UPDATE', nome: 'Atualizar evolução', alias: 'evolução')
            findOrSaveWhere(authority: 'ROLE_EVOLUCAO_DELETE', nome: 'Excluir evolução', alias: 'evolução')
            findOrSaveWhere(authority: 'ROLE_EVOLUCAO_REPORT', nome: 'Relatório evolução', alias: 'evolução')

            status.flush()
        }
    }
}
