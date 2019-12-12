package br.com.hospitaldocoracaoal.aria

import groovy.transform.CompileStatic
import groovy.util.logging.Slf4j
import org.springframework.scheduling.annotation.Scheduled

@Slf4j
@CompileStatic
class NotificacaoApacheService {

    @Scheduled(fixedDelay = 10000L, initialDelay = 5000L)
    def notificaPrazoVencido() {
        def criteria = Apache.createCriteria()
        def results = criteria.list() {
            isEmpty('notificacoes')
        }
        results
    }
}
