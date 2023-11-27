package com.example.tema.controller;

import com.example.tema.model.pojo.Board;
import com.example.tema.service.BoardService;
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
public class BoardController {
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }
    @PostMapping("/api/boards")
    public ResponseEntity<Integer> addNewBoard(@Validated @RequestBody Board board) {
        return ResponseEntity.status(201).body(boardService.addNewBoard(board));
    }

    @GetMapping("/api/boards")
    public ResponseEntity<List<Board>> getAllBoards() {
        return ResponseEntity.status(200).body(boardService.getBoardList());
    }

    @PutMapping("/api/boards")
    public ResponseEntity<Void> modifyBoard(@Validated @RequestBody Board board) {
        boardService.modifyBoard(board);
        return ResponseEntity.status(200).build();
    }

    @DeleteMapping("/api/boards/{id}")
    public ResponseEntity<Void> deleteBoards(@PathVariable int id) {
        boardService.deleteBoard(id);
        return ResponseEntity.status(200).build();
    }
}
