package com.example.pix.repository;

import com.example.pix.domain.Transacao;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

import java.util.UUID;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface TransacaoRepository extends CrudRepository<Transacao, UUID> {

}
