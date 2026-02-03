package com.example.domain;

import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.serde.annotation.Serdeable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Serdeable
@MappedEntity
public class Transacao {

    @Id
    private UUID id;
    private String clienteId;
    private BigDecimal valor;
    private String status;
    private LocalDateTime dataHora;

    public Transacao() {}

    public Transacao(UUID id, String clienteId, BigDecimal valor, String status, LocalDateTime dataHora) {
        this.id = id;
        this.clienteId = clienteId;
        this.valor = valor;
        this.status = status;
        this.dataHora = dataHora;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getClienteId() {
        return clienteId;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}