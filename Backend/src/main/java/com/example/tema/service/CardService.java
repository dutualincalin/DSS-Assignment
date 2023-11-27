package com.example.tema.service;

import com.example.tema.exceptions.BadRequestException;
import com.example.tema.exceptions.CollisionException;
import com.example.tema.exceptions.DatabaseRelationException;
import com.example.tema.exceptions.NotFoundException;
import com.example.tema.model.pojo.Card;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardService {
    private List<Card> cardList;

    private final DatabaseService databaseService;

    private final NotFoundException notFoundException;

    private final CollisionException collisionException;

    private final BadRequestException badRequestException;

    private final DatabaseRelationException databaseRelationException;

    public CardService(DatabaseService databaseService, NotFoundException notFoundException,
                       CollisionException collisionException,
                       BadRequestException badRequestException,
                       DatabaseRelationException databaseRelationException) {
        this.databaseService = databaseService;
        this.cardList = databaseService.getCardData();
        this.notFoundException = notFoundException;
        this.collisionException = collisionException;
        this.badRequestException = badRequestException;
        this.databaseRelationException = databaseRelationException;
    }

    public int addNewCard(Card card) {
        if(card.getTitle() == null || card.getTitle().isBlank() || card.getListId() <= 0) {
            throw badRequestException;
        }

        if(!databaseService.checkCardListExists(card.getListId())) {
            throw databaseRelationException;
        }

        if(cardCollisionCheck(card)) {
            throw collisionException;
        }

        int id = databaseService.addTo(card);
        card.setId(id);
        cardList.add(card);

        return id;
    }

    public List<Card> getCards() {
        return cardList;
    }

    public List<Card> getCardsByListId(int listId) {
        return cardList.stream().filter(card -> card.getListId() == listId)
            .collect(Collectors.toList());
    }

    public void modifyCard(Card card) {
        if(card.getTitle() == null || card.getTitle().isBlank() || card.getId() <= 0){
            throw badRequestException;
        }

        if(!databaseService.checkCardExists(card.getId())){
            throw notFoundException;
        }

        if(cardCollisionCheck(card)) {
            throw collisionException;
        }

        if(!databaseService.checkCardListExists(card.getListId())) {
            throw databaseRelationException;
        }

        databaseService.modifyCard(card);
        cardList = databaseService.getCardData();
    }

    public void deleteCard(int id) {
        if(id <= 0) {
            throw badRequestException;
        }

        if(!databaseService.checkCardExists(id)) {
            throw notFoundException;
        }

        databaseService.deleteCard(id);
        cardList = databaseService.getCardData();
    }

    public boolean cardCollisionCheck(Card card) {
        return cardList.stream()
            .anyMatch(cardItem -> cardItem.getListId() == card.getListId()
                && cardItem.getTitle().equals(card.getTitle())
                && cardItem.getDescription().equals(card.getDescription()));
    }
}
