package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.RegistroAtendimento
import br.com.hospitaldocoracaoal.integracao.Setor
import org.grails.datastore.mapping.query.api.BuildableCriteria

import java.time.LocalDate
import java.time.Period
import java.time.ZoneId

class PerfilEpidemiologicoService {

    private static final Closure FILTROS = { BuildableCriteria criteria, Date inicio, Date fim, Character[] tipos ->
        if (inicio != null && fim != null) {
            criteria.between 'dataAlta', inicio, fim
        }

        if (tipos != null) {
            criteria.in 'tipo', tipos
        }
    }

    private Set<RegistroAtendimento> examesPorSetor(Date inicio, Date fim, Character[] tipos, Collection<Setor> setores) {
        def criteria = RegistroAtendimento.createCriteria()
        return criteria.listDistinct {
            FILTROS(criteria, inicio, fim, tipos)

            exames {
                'in' 'setor', setores
            }
        } as Set<RegistroAtendimento>
    }

    private Set<RegistroAtendimento> leitosPorSetor(Date inicio, Date fim, Character[] tipos, Collection<Setor> setores) {
        def criteria = RegistroAtendimento.createCriteria()
        return criteria.listDistinct {
            createAlias 'registroAtendimentoLeitos', 'ral'
            createAlias 'ral.leito', 'l'
            'in' 'l.setor', setores

            FILTROS(criteria, inicio, fim, tipos)
        } as Set<RegistroAtendimento>
    }

    private Set<RegistroAtendimento> comandasPorSetor(Date inicio, Date fim, Character[] tipos, Collection<Setor> setores) {
        def criteria = RegistroAtendimento.createCriteria()
        return criteria.listDistinct {
            FILTROS(criteria, inicio, fim, tipos)

            comandas {
                'in' 'setor', setores
            }
        } as Set<RegistroAtendimento>
    }

    def gerarPerfil(Date inicio, Date fim, Character[] tipos = null, Collection<Setor> setores = null, boolean geral = true) {
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

        def total = registros.size()
        def homens = registros.count { it.paciente.sexo == 'M' }
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

        registros.each { registro ->
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
            }
        }

        cids = cids.sort { a, b -> b.quantidade <=> a.quantidade }
        if (cids.size() > 10) {
            cids = cids[0..9]
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
                cids  : cids,
                idades: idades
        ]
    }

}
