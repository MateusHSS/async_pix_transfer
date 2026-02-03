package com.example.domain;

import io.micronaut.data.annotation.Id;
import io.micronaut.serde.annotation.Serdeable;
import io.micronaut.data.annotation.MappedEntity;

import java.util.UUID;

@Serdeable
@MappedEntity()
public class Transacao {

    @Id
    private UUID id;
    private String status;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
