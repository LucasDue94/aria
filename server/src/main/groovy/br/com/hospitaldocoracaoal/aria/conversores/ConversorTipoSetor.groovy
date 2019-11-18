package br.com.hospitaldocoracaoal.aria.conversores

import br.com.hospitaldocoracaoal.aria.db.TipoSetor
import grails.databinding.converters.ValueConverter

class ConversorTipoSetor implements ValueConverter {

    @Override
    boolean canConvert(Object value) {
        value instanceof String
    }

    @Override
    Object convert(Object value) {
        TipoSetor.values().find { it.id == value}
    }

    @Override
    Class<?> getTargetType() {
        TipoSetor
    }
}
