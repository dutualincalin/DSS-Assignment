package com.example.tema.model.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(
    name = "cards",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"listId", "title"})}
)
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "listId")
    int listId;

    @Column(name = "title")
    String title;

    @Column(name = "description")
    String description;

    public CardEntity(int id, int listId, String title, String description) {
        this.id = id;
        this.listId = listId;
        this.title = title;
        this.description = description;
    }

    public CardEntity(String title, String description) {
        this.title = title;
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CardEntity that)) {
            return false;
        }

        if (getId() != that.getId()) {
            return false;
        }
        if (getListId() != that.getListId()) {
            return false;
        }
        if (!getTitle().equals(that.getTitle())) {
            return false;
        }
        return getDescription() != null ? getDescription().equals(that.getDescription()) :
            that.getDescription() == null;
    }

    @Override
    public int hashCode() {
        int result = getListId();
        result = 31 * result + getTitle().hashCode();
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        return result;
    }
}
