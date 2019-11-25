package br.com.hospitaldocoracaoal.aria.utils;

import java.time.LocalDate;
import java.util.Calendar;

public class DataUtils {
    public static int calculaIdadeEntreDatas(LocalDate dataNascimento, LocalDate data) {
//        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int idade =  data.getYear() - dataNascimento.getYear();

        if (data.getMonthValue() < dataNascimento.getMonthValue()) {
            idade--;
        }
        else if (data.getMonthValue() == dataNascimento.getMonthValue() && data.getDayOfMonth() < dataNascimento.getDayOfMonth()) {
                idade--;

        }

        return idade;
    }
}
