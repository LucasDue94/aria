package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.aria.utils.DataUtils
import br.com.hospitaldocoracaoal.integracao.Atendimento
import grails.gorm.services.Service
import grails.validation.ValidationException
import grails.web.servlet.mvc.GrailsParameterMap
import static java.util.Calendar.MINUTE

@Service(Balao)
abstract class BalaoService {

    abstract Balao get(Serializable id)

    abstract List<Balao> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    def save(Balao balao) {
        Atendimento ultimoRegistro = balao.atendimento.paciente.registrosAtendimento
                .findAll { r -> r.dataEntrada < balao.atendimento.dataEntrada }
                .sort { r1, r2 -> r1.dataEntrada <=> r2.dataEntrada }
                .last()

        if (ultimoRegistro.tipo == Atendimento.TIPO_EMERGENCIA && ultimoRegistro.ecg != null) {
            balao.save()
        } else {
            balao.errors.reject(
                    'ecocardiograma.atendimento.doesnt.exist',
                    'Ecocardiograma não encontrado.'
            )

            throw new ValidationException('Paciente não tem ecg cadastrado.', balao.errors)
        }
    }

    def gerarBalao(GrailsParameterMap args) {
        final LIMITE_MINUTOS = 90
        Calendar calendar = Calendar.instance
        List<Boolean> limite = []

        if(args.containsKey('dataInicio') && args.containsKey('dataFim')) {
            Date dataInicio = DataUtils.getFormatterToDate((String) args.dataInicio)
            Date dataFim = DataUtils.endOfDay(DataUtils.getFormatterToDate((String) args.dataFim))

            def ecg = Ecg.createCriteria()
            ecg.list(args) {
                between 'dataHoraPorta', dataInicio, dataFim
            }.each { Ecg e ->
                Atendimento proximoRegistro = e.atendimento.paciente.registrosAtendimento.sort { e1, e2 ->
                    e1.dataEntrada <=> e2.dataEntrada
                }.find {
                    it.dataEntrada > e.atendimento.dataEntrada
                }

                if (proximoRegistro != null && proximoRegistro.balao != null) {
                    calendar.time = e.dataHoraPorta
                    calendar.add MINUTE, LIMITE_MINUTOS
                    limite.add proximoRegistro.balao.dataHoraBalao <= calendar.time
                }

            }
        }

        return [
                atendidos: limite.count { it },
                naoAtendidos: limite.count { !it }
        ]
    }
}



