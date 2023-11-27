package com.example.tema.model.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CardList {
    private int id;
    private int boardId;
    private String name;

    public CardList(int id, int boardId, String name) {
        this.id = id;
        this.boardId = boardId;
        this.name = name;
    }

    public CardList(String name, int boardId) {
        this.name = name;
        this.boardId = boardId;
    }
}
