package br.com.hospitaldocoracaoal.aria

import br.com.hospitaldocoracaoal.integracao.Setor

class PerfilEpidemiologicoController {
    private static final Collection<String> FORMATOS_DATAS = ['yyyy-mm-dd', 'dd/mm/yyyy']

    static responseFormats = ['json', 'xml']
    PerfilEpidemiologicoService perfilEpidemiologicoService

    def index() {
        Map entradas = this.carregarFiltros()
        Date inicio = entradas.inicio
        Date fim = entradas.fim
        Character[] tipos = entradas.tipos
        Collection<Setor> setores = entradas.setores
        Boolean geral = entradas.geral

        if (inicio == null && fim == null) {
            Map datas = datasPadroes()
            inicio = datas.inicio
            fim = datas.fim
        }

        Map data = perfilEpidemiologicoService.gerarPerfil(inicio, fim, tipos, setores, geral)
        return [data: data]
    }

    private Map carregarFiltros() {
        Date inicio = params.containsKey('inicio') ? params.date('inicio', FORMATOS_DATAS) : null
        Date fim = params.containsKey('fim') ? params.date('fim', FORMATOS_DATAS) : null
        Boolean geral = params.containsKey('geral') ? params.boolean('geral') : true
        Character[] tipos = null
        String[] setoresIds = null

        if (params.containsKey('tipo')) {
            if (params.tipo instanceof String) {
                tipos = [!params.getChar('tipo')].empty ? [params.tipo] : null
            } else {
                tipos = params.tipo
            }
        }

        if (params.containsKey('setores')) {
            if (params.setores instanceof String) {
                setoresIds = !params.setores.empty ? [params.setores] : null
            } else {
                setoresIds = params.setores
            }
        }

        List<Setor> setores = setoresIds != null ? setoresIds.collect { Setor.load(it) } : null
        return [inicio: inicio, fim: fim, tipos: tipos, setores: setores, geral: geral]
    }

    private static Map datasPadroes() {
        Date fim = new Date()

        Calendar calendar = new GregorianCalendar()
        calendar.time = fim
        calendar.set Calendar.HOUR_OF_DAY, 0
        calendar.set Calendar.MINUTE, 0
        calendar.set Calendar.SECOND, 0
        calendar.set Calendar.MILLISECOND, 0

        fim = calendar.time
        calendar.add Calendar.MONTH, -1
        Date inicio = calendar.time

        return [inicio: inicio, fim: fim]
    }
}
