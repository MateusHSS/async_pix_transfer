package com.example.dto;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

@Serdeable
public record TransferenciaRequest(
        @NotBlank String clienteId,
        @NotNull @Min(0) BigDecimal valor,
        @NotBlank String chaveDestino
) {}
