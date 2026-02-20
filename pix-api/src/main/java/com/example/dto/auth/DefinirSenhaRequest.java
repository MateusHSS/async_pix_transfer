package com.example.dto.auth;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

@Serdeable
public record DefinirSenhaRequest(
        @NotBlank UUID clienteId,
        @NotBlank String senha
        ) {
}
