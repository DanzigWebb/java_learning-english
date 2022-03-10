package com.example.demo.rest.word;

import com.example.demo.db.entities.WordEntity;
import com.example.demo.db.repo.WordRepo;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.rest.word.model.Word;
import com.example.demo.rest.word.model.WordCreate;
import com.example.demo.rest.word.model.WordMapper;
import org.springframework.stereotype.Service;

@Service
public class WordService {
    private final WordRepo wordRepo;
    private final WordMapper wordMapper;

    public WordService(WordRepo wordRepo, WordMapper wordMapper) {
        this.wordRepo = wordRepo;
        this.wordMapper = wordMapper;
    }

    public Word create(WordCreate word) {
        var entity = new WordEntity();
        entity.setName(word.getName());
        entity.setDefinition(word.getDefinition());

        return wordMapper.toModel(wordRepo.save(entity));
    }

    public Word update(WordCreate word, Long id) {
        var entity = wordRepo.findById(id);

        if (entity.isEmpty()) {
            throw new EntityNotFoundException();
        }

        var getEntity = entity.get();

        getEntity.setName(word.getName());
        getEntity.setDefinition(word.getDefinition());
        getEntity.setDone(word.getDone());

        return wordMapper.toModel(wordRepo.save(getEntity));
    }
}
