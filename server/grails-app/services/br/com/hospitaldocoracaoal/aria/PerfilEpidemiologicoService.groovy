package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import java.time.LocalDate
import java.time.Period
import java.time.ZoneId

class PerfilEpidemiologicoService {

    def gerarPerfil(Date inicio, Date fim, Character[] tipos = null, boolean geral = true) {
        def criteria = RegistroAtendimento.createCriteria()
        List<RegistroAtendimento> registroAtendimentoList = (List<RegistroAtendimento>) criteria.list() {

            if (inicio && fim != null) {
                between 'dataAlta', inicio, fim
            }

            if (tipos != null) {
                'in' 'tipo', tipos
            }
        }

        def total = registroAtendimentoList.size()
        def homens = registroAtendimentoList.count { it.paciente.sexo == 'M' }
        def mulheres = total - homens

        def cids = []

        def idades = [
                [
                        limites   : [max: 15],
                        quantidade: 0
                ], [
                        limites   : [min: 16, max: 30],
                        quantidade: 0
                ], [
                        limites   : [min: 31, max: 60],
                        quantidade: 0
                ], [
                        limites   : [min: 61, max: 79],
                        quantidade: 0
                ], [
                        limites   : [min: 80],
                        quantidade: 0
                ]
        ]

        registroAtendimentoList.each { registro ->
            def cid = cids.find { it.codigo == registro.cid?.codigo }
            if (cid != null) {
                cid.quantidade++
            } else {
                String codigo = null
                String diagnostico = "Não cadastrado"
                if (registro.cid != null) {
                    codigo = registro.cid.codigo
                    diagnostico = registro.cid.diagnostico
                }

                cids << [codigo: codigo, diagnostico: diagnostico, quantidade: 1]
            }

            LocalDate entrada = registro.dataEntrada.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
            LocalDate nascimento = registro.paciente.nascimento.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
            Period periodo = Period.between nascimento, entrada

            int idadeDias = periodo.getDays()

            if (geral) {
                int idade = periodo.getYears()
                idades.each {
                    boolean pertenceFaixa = true
                    if (it.limites.containsKey('min')) {
                        pertenceFaixa &= idade >= it.limites.min
                    }

                    if (it.limites.containsKey('max')) {
                        pertenceFaixa &= idade <= it.limites.max
                    }

                    if (pertenceFaixa) it.quantidade++
                }
                println "Paciente ${registro.paciente.id} ${idade} anos e ${idadeDias} dias"
            }


        }

        idades.each {
            StringBuilder faixa = new StringBuilder()
            if (it.limites.containsKey('min')) {
                faixa.append(it.limites.containsKey('max') ? "De ${it.limites.min}" : "Maior que ${it.limites.min} anos")
            }

            if (it.limites.containsKey('max')) {
                faixa.append(faixa.length() == 0 ? 'Até ' : ' até ')
                        .append(it.limites.max as int)
                        .append(' anos')
            }

            it.faixaEtaria = faixa.toString()
        }


        idades*.remove 'limites'



        return [
                sexo  : [Masculino: homens, Feminino: mulheres],
                cids  : cids.sort { a, b -> b.quantidade <=> a.quantidade }[0..9],
                idades: idades
        ]
    }

}
