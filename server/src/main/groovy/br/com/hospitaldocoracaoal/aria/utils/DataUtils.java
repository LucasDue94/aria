package br.com.hospitaldocoracaoal.aria.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

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

    public static Date endOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, calendar.getMaximum(Calendar.HOUR_OF_DAY));
        calendar.set(Calendar.MINUTE, calendar.getMaximum(Calendar.MINUTE));
        calendar.set(Calendar.SECOND, calendar.getMaximum(Calendar.SECOND));
        calendar.set(Calendar.MILLISECOND, calendar.getMaximum(Calendar.MILLISECOND));
        return calendar.getTime();
    }

    public static Date startOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, calendar.getMinimum(Calendar.HOUR_OF_DAY));
        calendar.set(Calendar.MINUTE, calendar.getMinimum(Calendar.MINUTE));
        calendar.set(Calendar.SECOND, calendar.getMinimum(Calendar.SECOND));
        calendar.set(Calendar.MILLISECOND, calendar.getMinimum(Calendar.MILLISECOND));
        return calendar.getTime();
    }
}
