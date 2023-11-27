package com.example.tema.model.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(
    name = "card_lists",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"boardId", "name"})}
)
public class CardListEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "boardId")
    int boardId;

    @Column(name = "name")
    String name;

    @OneToMany(
        fetch = FetchType.EAGER,
        cascade = CascadeType.REMOVE,
        orphanRemoval = true,
        mappedBy = "listId"
    )
    List<CardEntity> cards;

    public CardListEntity(int id, int boardId, String name, List<CardEntity> cards) {
        this.id = id;
        this.boardId = boardId;
        this.name = name;
        this.cards = cards;
    }

    public CardListEntity(int boardId, String name, List<CardEntity> cards) {
        this.boardId = boardId;
        this.name = name;
        this.cards = cards;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CardListEntity that)) {
            return false;
        }

        if (getBoardId() != that.getBoardId()) {
            return false;
        }
        if (!getName().equals(that.getName())) {
            return false;
        }
        return getCards() != null ? getCards().equals(that.getCards()) : that.getCards() == null;
    }

    @Override
    public int hashCode() {
        int result = getBoardId();
        result = 31 * result + getName().hashCode();
        result = 31 * result + (getCards() != null ? getCards().hashCode() : 0);
        return result;
    }
}
