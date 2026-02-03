package com.example.exception;

import com.example.dto.ErroValidacao;
import io.micronaut.context.annotation.Replaces;
import io.micronaut.context.annotation.Requires;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.server.exceptions.ExceptionHandler;
import io.micronaut.validation.exceptions.ConstraintExceptionHandler;
import jakarta.inject.Singleton;
import jakarta.validation.ConstraintViolationException;

import java.util.ArrayList;
import java.util.List;

@Produces
@Singleton
@Requires(classes = {ConstraintViolationException.class, ExceptionHandler.class})
@Replaces(ConstraintExceptionHandler.class)
public class GlobalValidationExceptionHandler implements ExceptionHandler<ConstraintViolationException, HttpResponse<ErroValidacao>> {
    @Override
    public HttpResponse<ErroValidacao> handle (HttpRequest request, ConstraintViolationException exception) {
        List<String> erros = new ArrayList<>();

        exception.getConstraintViolations().forEach(c -> {
            String campo = c.getPropertyPath().toString();
            String mensagem = c.getMessage();
            erros.add(campo + ": " + mensagem);
        });

        ErroValidacao corpoErro = new ErroValidacao(
                "Erro de validação nos dados enviados",
                erros
        );

        return HttpResponse.badRequest(corpoErro);
    }
}
