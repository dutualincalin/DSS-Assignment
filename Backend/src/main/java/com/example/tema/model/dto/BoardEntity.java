package com.example.tema.model.dto;

import jakarta.annotation.Nonnull;
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
    name = "boards",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"boardName"})}
)
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "boardName")
    @Nonnull
    String boardName;

    @Column(name = "image")
    @Nonnull
    String image;

    @OneToMany(
        fetch = FetchType.EAGER,
        cascade = CascadeType.REMOVE,
        orphanRemoval = true,
        mappedBy = "boardId"
    )
    List<CardListEntity> lists;

    public BoardEntity(@Nonnull String boardName, @Nonnull String image, List<CardListEntity> lists) {
        this.boardName = boardName;
        this.image = image;
        this.lists = lists;
    }

    public BoardEntity(int id, @Nonnull String boardName, @Nonnull String image,
                       List<CardListEntity> lists) {
        this.id = id;
        this.boardName = boardName;
        this.image = image;
        this.lists = lists;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BoardEntity that)) {
            return false;
        }

        if (!getBoardName().equals(that.getBoardName())) {
            return false;
        }
        if (!getImage().equals(that.getImage())) {
            return false;
        }
        return getLists() != null ? getLists().equals(that.getLists()) : that.getLists() == null;
    }

    @Override
    public int hashCode() {
        int result = getBoardName().hashCode();
        result = 31 * result + getImage().hashCode();
        result = 31 * result + (getLists() != null ? getLists().hashCode() : 0);
        return result;
    }
}
