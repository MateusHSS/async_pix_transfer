package com.example.conta.domain;

import io.micronaut.serde.annotation.Serdeable;

import java.util.UUID;

@Serdeable
public record ClienteCadastradoEvent(
        UUID clienteId
) {}
