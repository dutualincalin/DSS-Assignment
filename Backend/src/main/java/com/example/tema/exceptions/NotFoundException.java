package com.example.tema.exceptions;

import org.springframework.stereotype.Component;

@Component
public class NotFoundException extends RuntimeException{
    public NotFoundException() {
        super("[ERROR] The element with the specific id was not found");
    }
}
