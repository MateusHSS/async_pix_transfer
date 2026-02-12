package com.example.domain;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;

import java.util.UUID;

@Serdeable
@MappedEntity("credenciais")
public class Credencial {

    @Id
    @GeneratedValue
    private UUID id;
    private UUID cliente_id;
    private String senha_hash;
    private boolean ativo;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getCliente_id() {
        return cliente_id;
    }

    public void setCliente_id(UUID cliente_id) {
        this.cliente_id = cliente_id;
    }

    public String getSenha_hash() {
        return senha_hash;
    }

    public void setSenha_hash(String senha_hash) {
        this.senha_hash = senha_hash;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
