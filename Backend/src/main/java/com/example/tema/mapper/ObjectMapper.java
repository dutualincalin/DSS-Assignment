package com.example.tema.mapper;

import com.example.tema.model.dto.BoardEntity;
import com.example.tema.model.dto.CardEntity;
import com.example.tema.model.dto.CardListEntity;
import com.example.tema.model.pojo.Board;
import com.example.tema.model.pojo.Card;
import com.example.tema.model.pojo.CardList;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(
    componentModel = MappingConstants.ComponentModel.SPRING,
    injectionStrategy = InjectionStrategy.CONSTRUCTOR
)
public interface ObjectMapper {
    ObjectMapper instance = Mappers.getMapper(ObjectMapper.class);


    Card EntityToInstance(CardEntity entity);

    CardList EntityToInstance(CardListEntity entity);

    Board EntityToInstance(BoardEntity entity);


    CardEntity InstanceToEntity(Card instance);

    CardListEntity InstanceToEntity(CardList instance);

    BoardEntity InstanceToEntity(Board instance);
}
