package com.example.tema.model.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Board {
    private int id;
    private String boardName;
    private String image;

    public Board(String boardName, String image) {
        this.boardName = boardName;
        this.image = image;
    }

    public Board(int id, String boardName, String image) {
        this.id = id;
        this.boardName = boardName;
        this.image = image;
    }
}
