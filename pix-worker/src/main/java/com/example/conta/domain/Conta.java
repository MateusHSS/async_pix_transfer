package com.example.conta.domain;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;

import java.math.BigDecimal;
import java.util.UUID;

@MappedEntity
@Serdeable
public class Conta {

    @Id
    @GeneratedValue
    private UUID id;
    private UUID clienteId;
    private String numero;
    private BigDecimal saldo = BigDecimal.ZERO;

    public Conta(UUID clienteId, String numero, BigDecimal saldo) {
        this.clienteId = clienteId;
        this.numero = numero;
        this.saldo = saldo;
    }

    public Conta(UUID clienteId, String numero) {
        this.clienteId = clienteId;
        this.numero = numero;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public UUID getClienteId() {
        return clienteId;
    }

    public void setClienteId(UUID clienteId) {
        this.clienteId = clienteId;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
