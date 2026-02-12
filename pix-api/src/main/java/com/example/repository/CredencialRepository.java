package com.example.repository;

import com.example.domain.Credencial;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface CredencialRepository extends CrudRepository<Credencial, UUID> {
    public Optional<Credencial> findBycliente_id(UUID clienteId);
}
