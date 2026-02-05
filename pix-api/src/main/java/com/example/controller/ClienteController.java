package com.example.controller;

import com.example.client.ContasProducerClient;
import com.example.domain.Cliente;
import com.example.dto.clientes.ClienteCadastradoEvent;
import com.example.dto.clientes.ClienteRequest;
import com.example.dto.clientes.ClienteResponse;
import com.example.repository.ClienteRepository;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import jakarta.inject.Inject;
import jakarta.validation.Valid;

@Controller("/api/v1/clientes")
public class ClienteController {
    @Inject
    ContasProducerClient kafkaClient;

    @Inject
    ClienteRepository repository;

    @Post
    public HttpResponse<ClienteResponse> cadastrar(@Body @Valid ClienteRequest request) {
        Cliente cliente = new Cliente(
            request.nome(),
            request.CPF(),
            request.email(),
            request.telefone()
        );

        repository.save(cliente);

        ClienteResponse response = new ClienteResponse(
            cliente.getId().toString(),
            cliente.getNome(),
            cliente.getCPF(),
            cliente.getEmail(),
            cliente.getTelefone()
        );

        ClienteCadastradoEvent evento = new ClienteCadastradoEvent(
            cliente.getId().toString()
        );

        kafkaClient.criarConta(evento);

        return HttpResponse.created(response);
    }
}
