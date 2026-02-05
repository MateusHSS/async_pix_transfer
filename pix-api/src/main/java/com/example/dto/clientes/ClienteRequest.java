package com.example.dto.clientes;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public record ClienteRequest (
        @NotBlank String nome,
        @NotBlank String CPF,
        @NotBlank String email,
        String telefone
) {
    public ClienteRequest {
        if (CPF != null) {
            CPF = CPF.replaceAll("\\D", "");
        }
    }
}
