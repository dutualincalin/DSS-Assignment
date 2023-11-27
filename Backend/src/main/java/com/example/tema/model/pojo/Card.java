package com.example.tema.model.pojo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Card {
    private int id;
    private int listId;
    private String title;
    private String description;

    public Card(int listId, String title, String description) {
        this.listId = listId;
        this.title = title;
        this.description = description;
    }

    public Card(int id, int listId, String title, String description) {
        this.id = id;
        this.listId = listId;
        this.title = title;
        this.description = description;
    }
}
