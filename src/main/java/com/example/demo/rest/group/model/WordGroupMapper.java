package com.example.demo.rest.group.model;

import com.example.demo.db.entities.WordGroupEntity;
import com.example.demo.rest.word.model.WordMapper;
import com.example.demo.utils.mapper.BaseMapper;
import org.springframework.stereotype.Service;

@Service
public class WordGroupMapper extends BaseMapper<WordGroup, WordGroupEntity> {

    private final WordMapper wordMapper;

    public WordGroupMapper(WordMapper wordMapper) {
        this.wordMapper = wordMapper;
    }

    @Override
    public WordGroup toModel(WordGroupEntity entity) {
        var group = new WordGroup();

        group.setId(entity.getId().toString());
        group.setName(entity.getName());
        group.setDone(entity.getDone());
        group.setArchived(entity.getArchived());
        group.setCreateAt(entity.getCreatedAt());
        group.setUpdateAt(entity.getUpdatedAt());
        group.setWords(wordMapper.entityListToModel(entity.getWords()));

        return group;
    }
}
