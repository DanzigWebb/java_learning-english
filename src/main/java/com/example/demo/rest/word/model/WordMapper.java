package com.example.demo.rest.word.model;

import com.example.demo.db.entities.WordEntity;
import com.example.demo.utils.mapper.BaseMapper;
import org.springframework.stereotype.Service;

@Service
public class WordMapper extends BaseMapper<Word, WordEntity> {

    @Override
    public Word toModel(WordEntity entity) {
        var word = new Word();

        word.setId(entity.getId().toString());
        word.setGroupId(entity.getGroup().getId().toString());
        word.setName(entity.getName());
        word.setDefinition(entity.getDefinition());
        word.setAssociate(entity.getAssociate());
        word.setDone(entity.getDone());
        word.setCreateAt(entity.getCreatedAt());
        word.setUpdateAt(entity.getUpdatedAt());

        return word;
    }
}
