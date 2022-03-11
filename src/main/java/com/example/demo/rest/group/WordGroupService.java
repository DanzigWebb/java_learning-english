package com.example.demo.rest.group;

import com.example.demo.db.entities.WordGroupEntity;
import com.example.demo.db.repo.WordGroupRepo;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.rest.group.model.WordGroup;
import com.example.demo.rest.group.model.WordGroupCreate;
import com.example.demo.rest.group.model.WordGroupMapper;
import org.springframework.stereotype.Service;

@Service
public class WordGroupService {

    private final WordGroupRepo wordGroupRepo;
    private final WordGroupMapper wordGroupMapper;

    public WordGroupService(WordGroupRepo wordGroupRepo, WordGroupMapper wordGroupMapper) {
        this.wordGroupRepo = wordGroupRepo;
        this.wordGroupMapper = wordGroupMapper;
    }

    WordGroup create(WordGroupCreate groupCreate) {
        var entity = new WordGroupEntity();
        entity.setName(groupCreate.getName());

        return wordGroupMapper.toModel(wordGroupRepo.save(entity));
    }

    WordGroup update(WordGroupCreate groupCreate, Long id) {
        var repoEntity = wordGroupRepo.findById(id);

        System.out.println(repoEntity);

        if (repoEntity.isEmpty()) {
            throw new EntityNotFoundException();
        }

        var entity = repoEntity.get();
        entity.setName(groupCreate.getName());
        entity.setDone(groupCreate.getDone());

        return wordGroupMapper.toModel(wordGroupRepo.save(entity));
    }
}
