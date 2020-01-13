grails.gorm.default.mapping = {
    id(generator: 'br.com.hospitaldocoracaoal.aria.db.SequenceGenerator')
}

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'br.com.hospitaldocoracaoal.aria.Usuario'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'br.com.hospitaldocoracaoal.aria.UsuarioPermissao'
grails.plugin.springsecurity.authority.className = 'br.com.hospitaldocoracaoal.aria.Permissao'
grails.plugin.springsecurity.authority.groupAuthorityNameField = 'authorities'
grails.plugin.springsecurity.useRoleGroups = true
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/',               access: ['permitAll']],
        [pattern: '/error',          access: ['permitAll']],
        [pattern: '/index',          access: ['permitAll']],
        [pattern: '/index.gsp',      access: ['permitAll']],
        [pattern: '/shutdown',       access: ['permitAll']],
        [pattern: '/assets/**',      access: ['permitAll']],
        [pattern: '/**/js/**',       access: ['permitAll']],
        [pattern: '/**/css/**',      access: ['permitAll']],
        [pattern: '/**/images/**',   access: ['permitAll']],
        [pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.rest.token.storage.useGorm = true
grails.plugin.springsecurity.rememberMe.persistent = true
grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName = 'br.com.hospitaldocoracaoal.aria.AuthenticationToken'
grails.plugin.springsecurity.rest.token.validation.useBearerToken = false
grails.plugin.springsecurity.rest.token.validation.headerName = 'X-Auth-Token'
grails.plugin.springsecurity.rest.logout.postOnly = false
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'tokenValue'
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName = 'username'

grails.plugin.springsecurity.roleHierarchy = """
 	 ROLE_PERFIL_EPIDEMIOLOGICO_INDEX > ROLE_SETOR_INDEX
 	 ROLE_PERFIL_EPIDEMIOLOGICO_INDEX > ROLE_PERMISSAO_INDEX
"""

grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/',               filters: 'none'],
        [pattern: '/error',          filters: 'none'],
        [pattern: '/index.html',     filters: 'none'],
        [pattern: '/**.js',          filters: 'none'],
        [pattern: '/**.css',         filters: 'none'],
        [pattern: '/**.woff',        filters: 'none'],
        [pattern: '/**.woff2',       filters: 'none'],
        [pattern: '/assets/**',      filters: 'none'],
        [pattern: '/**/js/**',       filters: 'none'],
        [pattern: '/**/css/**',      filters: 'none'],
        [pattern: '/**/images/**',   filters: 'none'],
        [pattern: '/**/favicon.ico', filters: 'none'],
        [pattern: '/application',    filters: 'none'],
        [pattern: '/api/**',         filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'],
        [pattern: '/**',             filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter']
]
