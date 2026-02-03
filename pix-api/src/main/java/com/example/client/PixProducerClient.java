package com.example.client;

import com.example.dto.TransferenciaEvent;
import io.micronaut.configuration.kafka.annotation.KafkaClient;
import io.micronaut.configuration.kafka.annotation.Topic;

@KafkaClient
public interface PixProducerClient {

    @Topic("transacoes-pix")
    void enviarPix(TransferenciaEvent evento);
}
