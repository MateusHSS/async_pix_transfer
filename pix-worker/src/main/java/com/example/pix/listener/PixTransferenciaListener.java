package com.example.pix.listener;

import com.example.pix.domain.Transacao;
import com.example.pix.domain.TransferenciaEvent;
import com.example.pix.repository.TransacaoRepository;
import io.micronaut.configuration.kafka.annotation.KafkaListener;
import io.micronaut.configuration.kafka.annotation.Topic;
import jakarta.inject.Inject;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
                evento.idTransacao(),
                evento.clienteId(),
                evento.valor(),
                status,
                LocalDateTime.now()
        );

        repository.save(transacao);

        System.out.println("LOG - Transação salva no banco:" + transacao);
    }
}
