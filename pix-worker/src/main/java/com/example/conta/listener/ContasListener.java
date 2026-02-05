package com.example.conta.listener;

import com.example.conta.domain.ClienteCadastradoEvent;
import com.example.conta.domain.Conta;
import com.example.conta.repository.ContaRepository;
import com.example.util.ContaUtils;
import io.micronaut.configuration.kafka.annotation.KafkaListener;
import io.micronaut.configuration.kafka.annotation.Topic;
import jakarta.inject.Inject;

@KafkaListener(groupId = "contas-group")
public class ContasListener {
    @Inject
    private ContaRepository contaRepository;

    @Topic("contas" )
    public void criarConta(ClienteCadastradoEvent evento) {
        System.out.println("LOG - Evento kafka recebido para criar conta: " + evento.clienteId());

        String numeroConta = ContaUtils.geraContaUnica();
        boolean exists = contaRepository.existsByNumero(numeroConta);;

        while(exists) {
            numeroConta = ContaUtils.geraContaUnica();
            exists = contaRepository.existsByNumero(numeroConta);
        };

        Conta conta = new Conta(
                evento.clienteId(),
                numeroConta
        );

        contaRepository.save(conta);

        System.out.println("LOG - Conta criada para o cliente: " + evento.clienteId());
    }
}
