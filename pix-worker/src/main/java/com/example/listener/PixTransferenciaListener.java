package com.example.listener;

import com.example.domain.Transacao;
import com.example.domain.TransferenciaEvent;
import com.example.repository.TransacaoRepository;
import io.micronaut.configuration.kafka.annotation.KafkaListener;
import io.micronaut.configuration.kafka.annotation.Topic;
import jakarta.inject.Inject;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@KafkaListener(groupId = "pix-worker-group")
public class PixTransferenciaListener {
    @Inject
    private TransacaoRepository repository;

    @Topic("transacoes-pix")
    public void receberTransferencia(TransferenciaEvent evento) {
        System.out.println("LOG - Evento kafka recebido: " + evento);

        String status = "APROVADO";

        if(evento.valor().compareTo(new BigDecimal("2000.00")) > 0) {
            status = "EM_ANALISE";
        }

        Transacao transacao = new Transacao(
                UUID.randomUUID(),
                evento.clienteId(),
                evento.valor(),
                status,
                LocalDateTime.now()
        );

        repository.save(transacao);

        System.out.println("LOG - Transação salva no banco:" + transacao);
    }
}
