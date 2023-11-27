package com.example.tema.repository;

import com.example.tema.model.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CardRepository extends JpaRepository<CardEntity, Integer> {
}
