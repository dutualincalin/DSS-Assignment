package com.example.tema.exceptions;

import org.springframework.stereotype.Component;

@Component
public class CollisionException extends RuntimeException {
    public CollisionException() {
        super("[ERROR] Database collision detected");
    }
}
