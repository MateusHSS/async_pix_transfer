package com.example.controller;

import com.example.domain.Cliente;
import com.example.domain.Credencial;
import com.example.dto.auth.DefinirSenhaRequest;
import com.example.repository.ClienteRepository;
import com.example.repository.CredencialRepository;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import jakarta.inject.Inject;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Map;
import java.util.Optional;

@Controller("/api/v1/auth")
public class AuthController {

    @Inject
    ClienteRepository clienteRepository;
    @Inject
    private CredencialRepository credencialRepository;

    @Get("/status/{cpf}")
    public HttpResponse<?> verificaStatus(@PathVariable String cpf) {
        String cpfLimpo = cpf.replaceAll("\\D", ""); // Remove caracteres não numéricos

        Optional<Cliente> clienteOpt = clienteRepository.findByCPF(cpfLimpo);

        if(clienteOpt.isEmpty()) {
            return HttpResponse.notFound("Cliente não encontrado");
        }

        Cliente cliente = clienteOpt.get();

        Optional<Credencial> credOpt = credencialRepository.findBycliente_id(cliente.getId());

        if(credOpt.isPresent()) {
            Credencial cred = credOpt.get();

            return HttpResponse.ok(Map.of(
                    "cliente_id", cliente.getId(),
                    "cpf", cliente.getCPF(),
                    "senhaDefinida", !cred.getSenha_hash().isEmpty(),
                    "ativo", cred.isAtivo()
            ));
        } else {
            return HttpResponse.ok(Map.of(
                    "cliente_id", cliente.getId(),
                    "cpf", cliente.getCPF(),
                    "senhaDefinida", false,
                    "ativo", false
            ));
        }
    }

    @Post("/definir-senha")
    public HttpResponse<?> definirSenha(@Body DefinirSenhaRequest request) {
        Optional<Cliente> clienteOpt = clienteRepository.findById(request.clienteId());

        if(clienteOpt.isEmpty()) {
            return HttpResponse.notFound("Cliente não encontrado");
        }

        Cliente cliente = clienteOpt.get();
        String hash = BCrypt.hashpw(request.senha(), BCrypt.gensalt());

        Credencial credencial = new Credencial(cliente.getId(), hash);

        credencialRepository.save(credencial);

        return HttpResponse.ok(Map.of("mensagem", "Senha definida com sucesso"));
    }

}
