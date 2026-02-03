package com.example.controller;

import com.example.client.PixProducerClient;
import com.example.domain.Transacao;
import com.example.dto.TransferenciaEvent;
import com.example.dto.TransferenciaRequest;
import com.example.dto.TransferenciaResponse;
import com.example.repository.TransacaoRepository;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import jakarta.inject.Inject;
import jakarta.validation.Valid;

import java.util.UUID;

@Controller("/api/v1/transferencias")
public class PixController {
    @Inject
    PixProducerClient kafkaClient;

    @Inject
    TransacaoRepository repository;

    @Post
    public HttpResponse<TransferenciaResponse> transferir(@Body @Valid TransferenciaRequest request) {

        UUID idTransacao = UUID.randomUUID();

        TransferenciaEvent evento = new TransferenciaEvent(
                idTransacao,
                request.clienteId(),
                request.valor(),
                request.chaveDestino()
        );

        System.out.println("LOG - Enviando evento para o kafka: " + evento);

        kafkaClient.enviarPix(evento);

        TransferenciaResponse response = new TransferenciaResponse(
            idTransacao,
                "Sua transferência está sendo processada"
        );

        return HttpResponse.accepted().body(response);
    }

    @Get("/status/{id}")
    public HttpResponse<Transacao> consultarStatus(@PathVariable UUID id) {
        return repository.findById(id)
                .map(transacao -> HttpResponse.ok(transacao))
                .orElse(HttpResponse.notFound());
    }
}
