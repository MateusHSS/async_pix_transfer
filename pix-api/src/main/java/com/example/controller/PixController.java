package com.example.controller;

import com.example.client.PixProducerClient;
import com.example.dto.TransferenciaEvent;
import com.example.dto.TransferenciaRequest;
import com.example.dto.TransferenciaResponse;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.inject.Inject;
import jakarta.validation.Valid;

import java.util.UUID;

@Controller("/api/v1/transferencias")
public class PixController {
    @Inject
    PixProducerClient kafkaClient;

    @Post
    public HttpResponse<TransferenciaResponse> transferir(@Body @Valid TransferenciaRequest request) {

        UUID idTransacao = UUID.randomUUID();

        TransferenciaEvent evento = new TransferenciaEvent(
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
}
