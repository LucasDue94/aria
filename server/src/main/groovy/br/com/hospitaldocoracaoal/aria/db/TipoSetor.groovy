package br.com.hospitaldocoracaoal.aria.db

enum TipoSetor {
    EMERGENCIA('E'),
    INTERNACAO('I'),
    HEMODINAMICA('H'),
    UTI('U')

    final String id

    TipoSetor(String id) {
        this.id = id
    }
}

