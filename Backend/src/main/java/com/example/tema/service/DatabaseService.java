package com.example.tema.service;

import com.example.tema.mapper.ObjectMapper;
import com.example.tema.model.dto.BoardEntity;
import com.example.tema.model.dto.CardEntity;
import com.example.tema.model.dto.CardListEntity;
import com.example.tema.model.pojo.Board;
import com.example.tema.model.pojo.Card;
import com.example.tema.model.pojo.CardList;
import com.example.tema.repository.BoardRepository;
import com.example.tema.repository.CardListRepository;
import com.example.tema.repository.CardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class DatabaseService {
    private final BoardRepository boardRepository;

    private final CardListRepository cardListRepository;

    private final CardRepository cardRepository;

    public DatabaseService(BoardRepository boardRepository, CardListRepository cardListRepository,
                           CardRepository cardRepository) {
        this.boardRepository = boardRepository;
        this.cardListRepository = cardListRepository;
        this.cardRepository = cardRepository;
    }

    /************************** Exists element **************************/

    public boolean checkBoardExists(int id) {
        return boardRepository.existsById(id);
    }

    public boolean checkCardListExists(int id) {
        return cardListRepository.existsById(id);
    }

    public boolean checkCardExists(int id) {
        return cardRepository.existsById(id);
    }

    /************************** Create element **************************/

    public int addTo(Board board){
        BoardEntity boardEntity = ObjectMapper.instance.InstanceToEntity(board);
        boardRepository.save(boardEntity);
        return boardEntity.getId();
    }

    public int addTo(CardList cardList) {
        CardListEntity cardListEntity = ObjectMapper.instance.InstanceToEntity(cardList);
        cardListRepository.save(cardListEntity);
        return cardListEntity.getId();
    }

    public int addTo(Card card) {
        CardEntity cardEntity = ObjectMapper.instance.InstanceToEntity(card);
        cardRepository.save(cardEntity);
        return cardEntity.getId();
    }

    /************************** Get Lists **************************/

    public List<Board> getBoardData() {
        List<BoardEntity> boardEntities = boardRepository.findAll();

        if(boardEntities.isEmpty()) {
            return new ArrayList<>();
        }

        return boardEntities.stream().map(ObjectMapper.instance::EntityToInstance)
            .collect(Collectors.toList());
    }

    public List<CardList> getCardListData() {
        List<CardListEntity> cardListEntities = cardListRepository.findAll();

        if(cardListEntities.isEmpty()) {
            return new ArrayList<>();
        }

        return cardListEntities.stream().map(ObjectMapper.instance::EntityToInstance)
            .collect(Collectors.toList());
    }

    public List<Card> getCardData() {
        List<CardEntity> cardEntities = cardRepository.findAll();

        if(cardEntities.isEmpty()) {
            return new ArrayList<>();
        }

        return cardEntities.stream().map(ObjectMapper.instance::EntityToInstance)
            .collect(Collectors.toList());
    }

    /************************** Modify element **************************/

    public void modifyBoard(Board board) {
        BoardEntity boardEntity = boardRepository.getReferenceById(board.getId());
        boardEntity.setBoardName(board.getBoardName());
        boardEntity.setImage(board.getImage());
    }

    public void modifyCardList(CardList cardList) {
        CardListEntity cardListEntity = cardListRepository.getReferenceById(cardList.getId());
        cardListEntity.setName(cardList.getName());
    }

    public void modifyCard(Card card) {
        CardEntity cardEntity = cardRepository.getReferenceById(card.getId());
        cardEntity.setTitle(card.getTitle());
        cardEntity.setDescription(card.getDescription());
    }

    /************************** Delete element **************************/

    public void deleteBoard(int id) {
        boardRepository.deleteById(id);
    }

    public void deleteCardList(int id) {
        cardListRepository.deleteById(id);
    }

    public void deleteCard(int id) {
        cardRepository.deleteById(id);
    }
}
