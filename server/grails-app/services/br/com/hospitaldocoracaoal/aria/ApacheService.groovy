package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import br.com.hospitaldocoracaoal.integracao.Paciente
import grails.gorm.services.Service
import grails.web.servlet.mvc.GrailsParameterMap
import org.hibernate.sql.JoinType

@Service(Apache)
abstract class ApacheService {

    abstract Apache get(Serializable id)

    abstract List<Apache> list(Map args)

    def report(GrailsParameterMap args) {
        Date dataInicio = DataUtils.getFormatterToDate(args.dataInicio)
        Date dataFim = DataUtils.getFormatterToDate(args.dataFim)

        def criteria = Apache.createCriteria()

        List<Apache> apacheList = criteria.list() {
            createAlias 'registroLeito', 'rl', JoinType.INNER_JOIN
            createAlias 'rl.leito', 'l', JoinType.INNER_JOIN
            createAlias 'l.setor', 's', JoinType.INNER_JOIN

            between 'rl.dataEntrada', dataInicio, dataFim
            eq('s.id', args.long('setorId'))
        } as List<Apache>

        def cirurgico = apacheList.findAll { !it.registroLeito.atendimento.cirurgias?.isEmpty() }
        def naoCirurgicos = apacheList - cirurgico
        def pacientesObito = []

        Closure closureAltas = {
            it.registroLeito.atendimento?.motivoAlta?.classificacao != 'O' || !it.registroLeito.ultimo
        }
        Closure closureObitos = {
            it.registroLeito.ultimo && it.registroLeito.atendimento?.motivoAlta?.classificacao == 'O'
        }

        // Smr Cirúrgico
        def cir1Smr = cirurgico.findAll({ it.escore <= 4 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore <= 4 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore <= 4 }).size() * 0.04d)
        if (cir1Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore <= 4 }).findAll(closureObitos)
        }

        def cir3Smr = cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).size() * 0.03d)
        if (cir3Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureObitos)
        }

        def cir7Smr = cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).size() * 0.07d)
        if (cir7Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureObitos)
        }

        def cir12Smr = cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).size() * 0.12d)
        if (cir12Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureObitos)
        }

        def cir30Smr = cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).size() * 0.30d)
        if (cir30Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureObitos)
        }

        def cir35Smr = cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).size() * 0.35d)
        if (cir3Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureObitos)
        }

        def cir73Smr = cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).size() * 0.73d)
        if (cir7Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureObitos)
        }

        def cir88Smr = cirurgico.findAll({ it.escore >= 35 }).size() == 0 ? 0
                : cirurgico.findAll({ it.escore >= 35 }).findAll(closureObitos).size() / (cirurgico.findAll({ it.escore >= 35 }).size() * 0.88d)
        if (cir88Smr >= 1) {
            pacientesObito.addAll cirurgico.findAll({ it.escore >= 35 }).findAll(closureObitos)
        }

//        Smr não cirúrgico
        def nCir4Smr = naoCirurgicos.findAll({ it.escore <= 4 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore <= 4 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore <= 4 }).size() * 0.04d)
        if (nCir4Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore <= 4 }).findAll(closureObitos)
        }

        def nCir8Smr = naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).size() * 0.08d)
        if (nCir8Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureObitos)
        }

        def nCir15Smr = naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).size() * 0.15d)
        if (nCir15Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureObitos)
        }

        def nCir24Smr = naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).size() * 0.24d)
        if (nCir24Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureObitos)
        }

        def nCir40Smr = naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).size() * 0.40d)
        if (nCir40Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureObitos)
        }

        def nCir55Smr = naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).size() * 0.55d)
        if (nCir55Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureObitos)
        }

        def nCir73Smr = naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).size() * 0.73d)
        if (nCir73Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureObitos)
        }

        def nCir85Smr = naoCirurgicos.findAll({ it.escore >= 35 }).size() == 0 ? 0
                : naoCirurgicos.findAll({ it.escore >= 35 }).findAll(closureObitos).size() / (naoCirurgicos.findAll({ it.escore >= 35 }).size() * 0.85d)
        if (nCir85Smr >= 1) {
            pacientesObito.addAll naoCirurgicos.findAll({ it.escore >= 35 }).findAll(closureObitos)
        }

        return [
                cirurgico   : [
                        '1%' : [
                                'quantidade': cirurgico.findAll({ it.escore <= 4 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore <= 4 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore <= 4 }).findAll(closureObitos).size(),
                                'smr'       : cir1Smr
                        ],
                        '3%' : [
                                'quantidade': cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureObitos).size(),
                                'smr'       : cir3Smr
                        ],
                        '7%' : [
                                'quantidade': cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureObitos).size(),
                                'smr'       : cir7Smr
                        ],
                        '12%': [
                                'quantidade': cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureObitos).size(),
                                'smr'       : cir12Smr
                        ],
                        '30%': [
                                'quantidade': cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureObitos).size(),
                                'smr'       : cir30Smr
                        ],
                        '35%': [
                                'quantidade': cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureObitos).size(),
                                'smr'       : cir35Smr
                        ],
                        '73%': [
                                'quantidade': cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureObitos).size(),
                                'smr'       : cir73Smr
                        ],
                        '88%': [
                                'quantidade': cirurgico.findAll({ it.escore >= 35 }).size(),
                                'altas'     : cirurgico.findAll({ it.escore >= 35 }).findAll(closureAltas).size(),
                                'obitos'    : cirurgico.findAll({ it.escore >= 35 }).findAll(closureObitos).size(),
                                'smr'       : cir88Smr
                        ]
                ],
                naoCirurgico: [
                        '4%' : [
                                'quantidade': naoCirurgicos.findAll({ it.escore <= 4 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore <= 4 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore <= 4 }).findAll(closureObitos).size(),
                                'smr'       : nCir4Smr
                        ],
                        '8%' : [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 5 && it.escore <= 9 }).findAll(closureObitos).size(),
                                'smr'       : nCir8Smr
                        ],
                        '15%': [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 10 && it.escore <= 14 }).findAll(closureObitos).size(),
                                'smr'       : nCir15Smr
                        ],
                        '24%': [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 15 && it.escore <= 19 }).findAll(closureObitos).size(),
                                'smr'       : nCir24Smr
                        ],
                        '40%': [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 20 && it.escore <= 24 }).findAll(closureObitos).size(),
                                'smr'       : nCir40Smr
                        ],
                        '55%': [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 25 && it.escore <= 29 }).findAll(closureObitos).size(),
                                'smr'       : nCir55Smr
                        ],
                        '73%': [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 30 && it.escore <= 34 }).findAll(closureObitos).size(),
                                'smr'       : nCir73Smr
                        ],
                        '85%': [
                                'quantidade': naoCirurgicos.findAll({ it.escore >= 35 }).size(),
                                'altas'     : naoCirurgicos.findAll({ it.escore >= 35 }).findAll(closureAltas).size(),
                                'obitos'    : naoCirurgicos.findAll({ it.escore >= 35 }).findAll(closureObitos).size(),
                                'smr'       : nCir85Smr
                        ]
                ],

                pacientesObito   : pacientesObito.registroLeito.atendimento.paciente
        ]
    }


    abstract Long count()

    abstract void delete(Serializable id)

    abstract Apache save(Apache apache)

}