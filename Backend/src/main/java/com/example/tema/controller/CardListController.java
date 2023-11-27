package com.example.tema.controller;

import com.example.tema.model.pojo.CardList;
import com.example.tema.service.CardListService;
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
public class CardListController {
    private final CardListService cardListService;

    public CardListController(CardListService cardListService) {
        this.cardListService = cardListService;
    }

    @PostMapping("api/cardLists")
    public ResponseEntity<Integer> addNewCardList(@Validated @RequestBody CardList cardList) {
        return ResponseEntity.status(201).body(cardListService.addNewCardList(cardList));
    }

    @GetMapping("api/cardLists")
    public ResponseEntity<List<CardList>> getAllCardLists() {
        return ResponseEntity.status(200).body(cardListService.getCardLists());
    }

    @GetMapping("api/cardLists/board/{boardId}")
    public ResponseEntity<List<CardList>> getAllCardListsFromBoard(@PathVariable int boardId) {
        return ResponseEntity.status(200).body(cardListService.getCardListsByBoardId(boardId));
    }

    @PutMapping("api/cardLists")
    public ResponseEntity<Void> modifyCardList(@Validated @RequestBody CardList cardList) {
        cardListService.modifyCardList(cardList);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("api/cardLists/{id}")
    public ResponseEntity<Void> deleteCardList(@PathVariable int id) {
        cardListService.deleteCardList(id);
        return ResponseEntity.status(200).build();
    }
}
