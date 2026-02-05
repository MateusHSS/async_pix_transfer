package com.example.client;

import com.example.dto.clientes.ClienteCadastradoEvent;
import io.micronaut.configuration.kafka.annotation.KafkaClient;
import io.micronaut.configuration.kafka.annotation.Topic;

@KafkaClient
public interface ContasProducerClient {

    @Topic("contas")
    void criarConta(ClienteCadastradoEvent evento);
}
