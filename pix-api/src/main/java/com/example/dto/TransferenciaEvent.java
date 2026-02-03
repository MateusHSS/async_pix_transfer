package com.example.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.math.BigDecimal;

@Serdeable
public record TransferenciaEvent(
        String clienteId,
        BigDecimal valor,
        String chaveDestino
) {}