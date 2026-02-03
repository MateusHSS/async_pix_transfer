package com.example.dto;

import io.micronaut.serde.annotation.Serdeable;

import java.util.List;

@Serdeable
public record ErroValidacao(
        String mensagem,
        List<String> detalhes
) {}
