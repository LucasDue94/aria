package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Setor

class PerfilEpidemiologicoController {

	static responseFormats = ['json', 'xml']
    PerfilEpidemiologicoService perfilEpidemiologicoService

    def index() {
        Date inicio
        Date fim

        // TODO: check input

        if (fim == null) {
            fim = new Date()

            Calendar calendar = new GregorianCalendar()
            calendar.time = fim
            calendar.set Calendar.HOUR_OF_DAY, 0
            calendar.set Calendar.MINUTE, 0
            calendar.set Calendar.SECOND, 0
            calendar.set Calendar.MILLISECOND, 0

            fim = calendar.time
            calendar.add Calendar.MONTH, -1
            inicio = calendar.time
        }

        Map data = perfilEpidemiologicoService.gerarPerfil(inicio, fim, null, [Setor.load('0032')])
        return [data: data]
    }
}
