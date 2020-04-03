package br.com.hospitaldocoracaoal.aria

import grails.gorm.services.Service

@Service(EstratificacaoRisco)
abstract class EstratificacaoRiscoService {

    abstract EstratificacaoRisco get(Serializable id)

    abstract List<EstratificacaoRisco> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract EstratificacaoRisco save(EstratificacaoRisco estratificacaoRisco)

    def resume() {
        return [
                paciente: 'John Doe',
                nascimento: new Date(),
                alergia: true,
                riscoFlebite: true,
                riscoBroncoaspiracao: false,
                riscoSangramento: false,
                riscoDelirium: false,
                riscoPerdaSne: false,
                riscoDor: false,
                riscoGlicemiaInstavel: false,
                riscoTevClinico: false,
                riscoTevCirurgico: false,
                escalaBraden: 'Baixo Risco',
                escalaBradenQ: 'Não se aplica',
                quedaAdulto: 'Risco Alto',
                quedaPediatria: 'Não se aplica'
        ]
    }

}