package com.example.tema.repository;

import com.example.tema.model.dto.CardListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardListRepository extends JpaRepository<CardListEntity, Integer> {
}
