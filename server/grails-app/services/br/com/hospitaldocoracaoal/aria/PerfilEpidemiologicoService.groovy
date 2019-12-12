package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Cid
import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import br.com.hospitaldocoracaoal.integracao.SetorWpd
import org.grails.datastore.mapping.query.api.BuildableCriteria

class PerfilEpidemiologicoService {


    private static final Closure FILTROS = { BuildableCriteria criteria, Date inicio, Date fim, Character[] tipos ->
        if (inicio != null && fim != null) {
            Calendar calendar = new GregorianCalendar()
            calendar.time = fim
            calendar.add Calendar.DATE, 1
            fim = calendar.time


            criteria.ge 'dataAlta', inicio
            criteria.lt 'dataAlta', fim
        }

        if (tipos != null) {
            criteria.in 'tipo', tipos
        }
    }

    private Set<RegistroAtendimento> examesPorSetor(Date inicio, Date fim, Character[] tipos, Collection<SetorWpd> setores) {
        def criteria = RegistroAtendimento.createCriteria()
        return criteria.listDistinct {
            FILTROS(criteria, inicio, fim, tipos)

            exames {
                'in' 'setor', setores
            }
        } as Set<RegistroAtendimento>
    }


    private Set<RegistroAtendimento> leitosPorSetor(Date inicio, Date fim, Character[] tipos, Collection<SetorWpd> setores) {
        def criteria = RegistroAtendimento.createCriteria()
        return criteria.listDistinct {
            createAlias 'registroAtendimentoLeitos', 'ral'
            createAlias 'ral.leito', 'l'
            'in' 'l.setor', setores

            FILTROS(criteria, inicio, fim, tipos)
        } as Set<RegistroAtendimento>
    }

    private Set<RegistroAtendimento> comandasPorSetor(Date inicio, Date fim, Character[] tipos, Collection<SetorWpd> setores) {
        def criteria = RegistroAtendimento.createCriteria()
        return criteria.listDistinct {
            FILTROS(criteria, inicio, fim, tipos)

            comandas {
                'in' 'setor', setores
            }
        } as Set<RegistroAtendimento>
    }


    def gerarPerfil(Date inicio, Date fim, Character[] tipos = null, Collection<SetorWpd> setores = null, Boolean perfilGeral = true) {
        def criteria = RegistroAtendimento.createCriteria()

        Set<RegistroAtendimento> registros = (Set<RegistroAtendimento>) criteria.listDistinct {
            FILTROS(criteria, inicio, fim, tipos)

            if (setores != null && !setores.empty) {
                'in' 'setor', setores
            }
        }

        if (setores != null && !setores.empty) {
            registros.addAll examesPorSetor(inicio, fim, tipos, setores)
            registros.addAll comandasPorSetor(inicio, fim, tipos, setores)
            registros.addAll leitosPorSetor(inicio, fim, tipos, setores)
        }

        final long UM_DIA_MILIS = 24l * 60 * 60 * 1000
        final long UM_ANO = 365

        if (!perfilGeral) {
            registros = registros.findAll { registro ->
                Math.floorDiv(registro.dataEntrada.time - registro.paciente.nascimento.time, UM_ANO * UM_DIA_MILIS) < 18
            }
        }

        def total = registros.size()
        def homens = registros.count { it.paciente.sexo == 'M' }
        def mulheres = total - homens

        def cids = []
        def motivosAltas = []

        def idades
        if (perfilGeral) {
            idades = [
                    [
                            faixaEtaria: 'Até 15 anos',
                            limites    : [max: 15 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 15 a 30 anos',
                            limites    : [min: 15 * UM_ANO, max: 30 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 31 a 60 anos',
                            limites    : [min: 31 * UM_ANO, max: 60 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 61 a 79 anos',
                            limites    : [min: 61 * UM_ANO, max: 79 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'Maior que 80 anos',
                            limites    : [min: 80 * UM_ANO],
                            quantidade : 0
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
                            limites    : [min: 29, max: 365],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 1 ano a menor que 4 anos',
                            limites    : [min: 1 * UM_ANO, max: 4 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 4 anos a menor que 10 anos',
                            limites    : [min: 4 * UM_ANO, max: 10 * UM_ANO],
                            quantidade : 0
                    ], [
                            faixaEtaria: 'De 10 anos a menor que 18 anos',
                            limites    : [min: 10 * UM_ANO, max: 18 * UM_ANO],
                            quantidade : 0
                    ]
            ]
        }

        registros.each { registro ->

            def motivoAlta = motivosAltas.find { it.motivoAltaId == registro.motivoAlta.id }
            if (motivoAlta != null) {
                motivoAlta.quantidade++
            } else {
                String motivoAltaId = null
                String descricao = "Não cadastrado"
                if (registro.motivoAlta != null) {
                    motivoAltaId = registro.motivoAlta.id
                    descricao = registro.motivoAlta.descricao
                }
                motivosAltas << [motivoAltaId: motivoAltaId, descricao: descricao, quantidade: 1]
            }


            Cid cid = registro.cid
            if (cid == null && !registro.atendimentos.empty) {
                cid = registro.atendimentos.last().cid
            }
            def perfilCid = cids.find { c -> c.codigo == cid?.id }

            if (perfilCid != null) {
                perfilCid.quantidade++
            } else {
                String codigo = null
                String diagnostico = "Não cadastrado"

                if (cid != null) {
                    codigo = cid.id
                    diagnostico = cid.diagnostico
                }

                cids << [codigo: codigo, diagnostico: diagnostico, quantidade: 1]
            }

            long idade = Math.floorDiv(registro.dataEntrada.time - registro.paciente.nascimento.time, UM_DIA_MILIS)

            def faixa = idades.find {
                boolean pertenceFaixa = true
                if (it.limites.containsKey('min')) {
                    pertenceFaixa &= idade >= it.limites.min
                }

                if (it.limites.containsKey('max')) {
                    pertenceFaixa &= idade < it.limites.max
                }

                return pertenceFaixa
            }

            if (faixa != null) {
                faixa.quantidade++
            }
        }

        cids = cids.sort {
            a, b -> b.quantidade <=> a.quantidade
        }

        motivosAltas = motivosAltas.sort {
            a, b -> b.quantidade <=> a.quantidade
        }
        if (cids.size() > 10) {
            cids = cids[0..9]
        }


        idades.removeIf { it.quantidade == 0 }
        idades*.remove 'limites'

        return [
                sexo       : [Masculino: homens, Feminino: mulheres],
                cids       : cids,
                idades     : idades,
                motivoAltas: motivosAltas
        ]

    }
}


