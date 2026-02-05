package com.example.util;

import java.util.Random;

public class ContaUtils {
    private static final Random RANDOM = new Random();

    public static String geraContaUnica() {
        int numeroBase = 100000 + RANDOM.nextInt(900000);
        String baseString = String.valueOf(numeroBase);

        char digitoVerificador = calcularDigitoVerificador(baseString);

        return baseString + "-" + digitoVerificador;
    }

    public static char calcularDigitoVerificador(String numero) {
        int soma = 0;
        int peso = 2;

        for (int i = numero.length() - 1; i >= 0; i--) {
            int digito = Character.getNumericValue(numero.charAt(i));
            soma += digito * peso;
            peso++;

            if(peso > 9) {
                peso = 2;
            }
        }

        int resto = soma % 11;
        int digitoVerificador = 11 - resto;

        if (digitoVerificador >= 10) {
            return '0';
        }

        return Character.forDigit(digitoVerificador, 10);
    }

    public static boolean isContaValida(String conta) {
        if(conta == null || !conta.contains("-")) {
            return false;
        }

        String[] partes = conta.split("-");

        if(partes.length != 2) {
            return false;
        }

        String base = partes[0];
        String digitoVerificadorInformado = partes[1];

        return String.valueOf(calcularDigitoVerificador(base)).equals(digitoVerificadorInformado);
    }
}
