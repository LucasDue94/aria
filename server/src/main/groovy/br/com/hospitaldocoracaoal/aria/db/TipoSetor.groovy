package br.com.hospitaldocoracaoal.aria.db

enum TipoSetor {
    AMBULATORIO('A'),
    EMERGENCIA('E'),
    INTERNACAO('I'),
    HEMODINAMICA('H'),
    UTI('U')

    final String id

    TipoSetor(String id) {
        this.id = id
    }

    static TipoSetor tipoSetorPorId(String nome) {
        values().find { it.id == nome}
    }
}

