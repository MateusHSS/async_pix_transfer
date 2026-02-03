package com.example.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.math.BigDecimal;
import java.util.UUID;

@Serdeable
public record TransferenciaEvent(
        UUID idTransacao,
        String clienteId,
        BigDecimal valor,
        String chaveDestino
) {}