package com.example.tema.controller;

import com.example.tema.model.pojo.Card;
import com.example.tema.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("api/cards")
    public ResponseEntity<Integer> addNewCard(@Validated @RequestBody Card card) {
        return ResponseEntity.status(201).body(cardService.addNewCard(card));
    }

    @GetMapping("api/cards")
    public ResponseEntity<List<Card>> getAllCards() {
        return ResponseEntity.status(200).body(cardService.getCards());
    }

    @GetMapping("api/cards/cardList/{listId}")
    public ResponseEntity<List<Card>> getAllCardsFromCardList(@PathVariable int listId) {
        return ResponseEntity.status(200).body(cardService.getCardsByListId(listId));
    }

    @PutMapping("api/cards")
    public ResponseEntity<Void> modifyCard(@Validated @RequestBody Card card) {
        cardService.modifyCard(card);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("api/cards/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable int id) {
        cardService.deleteCard(id);
        return ResponseEntity.status(200).build();
    }
}
