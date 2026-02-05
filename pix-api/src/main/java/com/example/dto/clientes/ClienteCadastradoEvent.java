package com.example.dto.clientes;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record ClienteCadastradoEvent(
        String id,
        String nome,
        String CPF,
        String email,
        String telefone
) {}
