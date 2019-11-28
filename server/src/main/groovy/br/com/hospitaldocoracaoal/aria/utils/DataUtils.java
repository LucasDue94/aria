package br.com.hospitaldocoracaoal.aria.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

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

    public static Date getFormatterToDate(String date) throws ParseException {
        DateFormat format = null;

        if (date.contains("-")) {
            format = new SimpleDateFormat("yyyy-MM-dd");
        } else if (date.contains("/")) {
            format = new SimpleDateFormat("dd/MM/yyyy");
        }

        return format.parse(date);
    }
}
