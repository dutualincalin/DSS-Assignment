package com.example.tema.service;

import com.example.tema.exceptions.BadRequestException;
import com.example.tema.exceptions.CollisionException;
import com.example.tema.exceptions.DatabaseRelationException;
import com.example.tema.exceptions.NotFoundException;
import com.example.tema.model.pojo.CardList;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CardListService {
    private List<CardList> cardLists;

    private final DatabaseService databaseService;

    private final NotFoundException notFoundException;

    private final CollisionException collisionException;

    private final BadRequestException badRequestException;

    private final DatabaseRelationException databaseRelationException;

    public CardListService(DatabaseService databaseService, NotFoundException notFoundException,
                           CollisionException collisionException,
                           BadRequestException badRequestException,
                           DatabaseRelationException databaseRelationException) {
        this.databaseService = databaseService;
        this.cardLists = databaseService.getCardListData();
        this.notFoundException = notFoundException;
        this.collisionException = collisionException;
        this.badRequestException = badRequestException;
        this.databaseRelationException = databaseRelationException;
    }

    public int addNewCardList(CardList cardList) {
        if(cardList.getName() == null || cardList.getName().isBlank() || cardList.getBoardId() <= 0) {
            throw badRequestException;
        }

        if(!databaseService.checkBoardExists(cardList.getBoardId())) {
            throw databaseRelationException;
        }

        if(cardListCollisionCheck(cardList.getBoardId(), cardList.getName())) {
            throw collisionException;
        }

        int id = databaseService.addTo(cardList);
        cardList.setId(id);
        cardLists.add(cardList);

        return id;
    }

    public List<CardList> getCardLists() {
        return cardLists;
    }

    public List<CardList> getCardListsByBoardId(int boardId) {
        return cardLists.stream().filter(cardList -> cardList.getBoardId() == boardId)
            .collect(Collectors.toList());
    }

    public void modifyCardList(CardList cardList) {
        if(cardList.getName() == null || cardList.getName().isBlank()
            || cardList.getId() <= 0 || cardList.getBoardId() <= 0){
            throw badRequestException;
        }

        if(!databaseService.checkCardListExists(cardList.getId())){
            throw notFoundException;
        }

        if(!databaseService.checkBoardExists(cardList.getBoardId())) {
            throw databaseRelationException;
        }

        if(cardListCollisionCheck(cardList.getBoardId(), cardList.getName())) {
            throw collisionException;
        }

        databaseService.modifyCardList(cardList);
        cardLists = databaseService.getCardListData();
    }

    public void deleteCardList(int id) {
        if(id <= 0) {
            throw badRequestException;
        }

        if(!databaseService.checkCardListExists(id)) {
            throw notFoundException;
        }

        databaseService.deleteCardList(id);
        cardLists = databaseService.getCardListData();
    }

    public boolean cardListCollisionCheck(int boardId, String name) {
        return cardLists.stream()
            .anyMatch(cardList -> cardList.getBoardId() == boardId && cardList.getName().equals(name));
    }
}
