package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimentoLeito
import groovy.util.logging.Slf4j
import org.springframework.scheduling.annotation.Scheduled

import javax.transaction.Transactional

import static org.hibernate.sql.JoinType.INNER_JOIN
import static org.hibernate.sql.JoinType.LEFT_OUTER_JOIN

@Slf4j
@Transactional
class NotificacaoApacheService {

    static lazyInit = false

//    @Scheduled(fixedDelay = 600000L, initialDelay = 5000L)
    def notificaPrazoVencido() {
        Calendar calendar = GregorianCalendar.instance
        calendar.time = new Date()
        calendar.add Calendar.DATE, -1
        Date ontem = calendar.time

        Date date2019 = new GregorianCalendar(2019, Calendar.JANUARY, 1).getTime()

        Notificacao.withTransaction { status ->
            List<Setor> setores = Setor.findAllByTipoSetor TipoSetor.UTI

            def criteria = RegistroAtendimentoLeito.withCriteria {
                createAlias 'apache', 'a', LEFT_OUTER_JOIN
                createAlias 'leito', 'l', INNER_JOIN
                createAlias 'l.setor', 's', INNER_JOIN
                createAlias 'notificacoes', 'n', LEFT_OUTER_JOIN

                isNull 'a.registroAtendimentoLeito'
                isNull 'n.id'
                le 'dataEntrada', ontem
                'in' 's.id', setores.setorWpd.id
                ge 'dataEntrada', date2019 // TODO: remove it
            }

            def apacheSetores = criteria.leito.setor.unique()
            def notificacoes = criteria.collect { RegistroAtendimentoLeito ral ->
                def responsaveis = ral.leito.setor.setor.usuarios.id.collect { Usuario.load it }
                new Notificacao(responsaveis: responsaveis, registroAtendimentoLeito: ral)
            }
            notificacoes*.save()
            status.flush()

            apacheSetores.each { set ->
                def setorNotificacoes = notificacoes.findAll { it.registroAtendimentoLeito.leito.setor.id == set.id }
                def responsaveis = setorNotificacoes.responsaveis.findAll { !it.empty }.unique()

                if (responsaveis != null && !responsaveis.empty) {
                    sendMail {
                        to responsaveis.email.unique()
                        subject 'Alerta Apache'
                        html view: '/apache/notificationEmail', model: [pacientes: setorNotificacoes.registroAtendimentoLeito.registroAtendimento.paciente.nome]
                    }
                }
            }
        }
    }
}
