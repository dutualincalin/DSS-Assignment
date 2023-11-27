package com.example.tema.controller;

import com.example.tema.exceptions.BadRequestException;
import com.example.tema.exceptions.CollisionException;
import com.example.tema.exceptions.DatabaseRelationException;
import com.example.tema.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionController extends ResponseEntityExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<Object> handleBadRequestException(
        Exception exception,
        WebRequest request
    ) {
        log.error(exception.getMessage());
        return handleExceptionInternal(
            exception,
            null,
            new HttpHeaders(),
            HttpStatusCode.valueOf(400),
            request
        );
    }

    @ExceptionHandler(CollisionException.class)
    public final ResponseEntity<Object> handleCollisionException(
        Exception exception,
        WebRequest request
    ) {
        log.error(exception.getMessage());
        return handleExceptionInternal(
            exception,
            null,
            new HttpHeaders(),
            HttpStatusCode.valueOf(409),
            request
        );
    }

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<Object> handleNotFoundException(
        Exception exception,
        WebRequest request
    ) {
        log.error(exception.getMessage());
        return handleExceptionInternal(
            exception,
            null,
            new HttpHeaders(),
            HttpStatusCode.valueOf(404),
            request
        );
    }

    @ExceptionHandler(DatabaseRelationException.class)
    public final ResponseEntity<Object> handleDatabaseRelationException(
        Exception exception,
        WebRequest request
    ) {
        log.error(exception.getMessage());
        return handleExceptionInternal(
            exception,
            null,
            new HttpHeaders(),
            HttpStatusCode.valueOf(422),
            request
        );
    }
}
