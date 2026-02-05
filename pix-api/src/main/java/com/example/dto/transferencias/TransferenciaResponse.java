package com.example.dto.transferencias;

import io.micronaut.serde.annotation.Serdeable;
import java.util.UUID;

@Serdeable
public record TransferenciaResponse (
        UUID idTransacao,
        String mensagem
) {}