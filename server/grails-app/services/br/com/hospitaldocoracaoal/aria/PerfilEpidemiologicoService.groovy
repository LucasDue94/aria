package br.com.hospitaldocoracaoal.aria
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento

class PerfilEpidemiologicoService {

    def gerarPerfil(Date inicio, Date fim, Character[] tipos, boolean geral = true) {
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

        final long UM_DIA_MILIS = 24l * 60 * 60 * 1000
        final long UM_ANO = 365

        def idades
        if (geral) {
            idades = [
                    [
                            faixaEtaria: 'Até 15 anos',
                            limites    : [max: 15 * UM_ANO],
                            quantidade : 0
                    ], [
                            limites   : [min: 15 * UM_ANO, max: 30 * UM_ANO],
                            quantidade: 0
                    ], [
                            limites   : [min: 31 * UM_ANO, max: 60 * UM_ANO],
                            quantidade: 0
                    ], [
                            limites   : [min: 61 * UM_ANO, max: 79 * UM_ANO],
                            quantidade: 0
                    ], [
                            limites   : [min: 80 * UM_ANO],
                            quantidade: 0
                    ]
            ]
        } else {
            idades = [
                    [
                            faixaEtaria: '0 a 28 dias',
                            limites    : [min: 0, max: 28],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 29 dias a menor que 1 ano',
                            limites    : [min: 29, max: 364],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 1 ano a menor que 4 anos',
                            limites    : [min: 1 * UM_ANO, max: 3 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 4 anos a menor que 10 anos',
                            limites    : [min: 4 * UM_ANO, max: 9 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 10 anos a menor que 18 anos',
                            limites    : [min: 10 * UM_ANO, max: 17 * UM_ANO],
                            quantidade : 0
                    ]
            ]
        }


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

            long idade = (registro.dataEntrada.time - registro.paciente.nascimento.time) / UM_DIA_MILIS

            if (idade >= 0 * UM_ANO && idade <= 15 * UM_ANO) {
                println "${idade} dias | pac - ${registro.paciente.id}"
            }

            if (geral) {
                def faixa = idades.find {
                    boolean pertenceFaixa = true
                    if (it.limites.containsKey('min')) {
                        pertenceFaixa &= idade >= it.limites.min
                    }

                    if (it.limites.containsKey('max')) {
                        pertenceFaixa &= idade <= it.limites.max
                    }

                    return pertenceFaixa
                }

                if (faixa != null) {
                    faixa.quantidade++
                }
            } else {
                def faixa = idades.find {
                    boolean pertenceFaixa = true
                    if (it.limites.containsKey('min')) {
                        pertenceFaixa &= idade >= it.limites.min
                    }

                    if (it.limites.containsKey('max')) {
                        pertenceFaixa &= idade <= it.limites.max
                    }
                    return pertenceFaixa
                }

                if (faixa != null) {
                    faixa.quantidade++
                }
            }
        }

        idades.removeIf { it.quantidade == 0 }
        idades*.remove 'limites'

        return [
                sexo  : [Masculino: homens, Feminino: mulheres],
                cids  : cids.sort { a, b -> b.quantidade <=> a.quantidade },
                idades: idades
        ]
    }

    private enum UnidadeTempo {
        DIAS, ANOS
    }
}