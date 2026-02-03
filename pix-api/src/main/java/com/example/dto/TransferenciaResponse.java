package com.example.dto;

import io.micronaut.serde.annotation.Serdeable;
import java.util.UUID;

@Serdeable
public record TransferenciaResponse (
        UUID idTransacao,
        String mensagem
) {}