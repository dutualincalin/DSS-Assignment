package com.example.tema.service;

import com.example.tema.exceptions.BadRequestException;
import com.example.tema.exceptions.CollisionException;
import com.example.tema.exceptions.NotFoundException;
import com.example.tema.model.pojo.Board;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    private List<Board> boardList;

    private final DatabaseService databaseService;

    private final NotFoundException notFoundException;

    private final CollisionException collisionException;

    private final BadRequestException badRequestException;

    public BoardService(DatabaseService databaseService, NotFoundException notFoundException,
                        CollisionException collisionException,
                        BadRequestException badRequestException) {
        this.databaseService = databaseService;
        this.boardList = databaseService.getBoardData();
        this.notFoundException = notFoundException;
        this.collisionException = collisionException;
        this.badRequestException = badRequestException;
    }

    public int addNewBoard(Board board) {
        if(board.getBoardName() == null || board.getBoardName().isBlank()
            || board.getImage() == null ||  board.getImage().isBlank())
        {
            throw badRequestException;
        }

        if(boardCollisionCheck(board)) {
            throw collisionException;
        }

        int id = databaseService.addTo(board);
        board.setId(id);
        boardList.add(board);

        return id;
    }

    public List<Board> getBoardList() {
        return boardList;
    }

    public void modifyBoard(Board board) {
        if(board.getBoardName().isBlank() || board.getImage().isBlank() || board.getId() <= 0) {
            throw badRequestException;
        }

        if(!databaseService.checkBoardExists(board.getId())){
            throw notFoundException;
        }

        if(boardCollisionCheck(board)) {
            throw collisionException;
        }

        databaseService.modifyBoard(board);
        boardList = databaseService.getBoardData();
    }

    public void deleteBoard(int id) {
        if(id <= 0) {
            throw badRequestException;
        }

        if(!databaseService.checkBoardExists(id)) {
            throw notFoundException;
        }

        databaseService.deleteBoard(id);
        boardList = databaseService.getBoardData();
    }

    public boolean boardCollisionCheck(Board board) {
        return boardList.stream().anyMatch(
            boardItem -> boardItem.getBoardName().equals(board.getBoardName())
                && boardItem.getImage().equals(board.getImage())
        );
    }
}
