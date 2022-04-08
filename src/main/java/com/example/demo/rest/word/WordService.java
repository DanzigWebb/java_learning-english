package com.example.demo.rest.word;

import com.example.demo.db.entities.WordEntity;
import com.example.demo.db.repo.WordGroupRepo;
import com.example.demo.db.repo.WordRepo;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.rest.word.model.Word;
import com.example.demo.rest.word.model.WordCreate;
import com.example.demo.rest.word.model.WordMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {
    private final WordRepo wordRepo;
    private final WordGroupRepo wordGroupRepo;
    private final WordMapper wordMapper;

    public WordService(WordRepo wordRepo, WordGroupRepo wordGroupRepo, WordMapper wordMapper) {
        this.wordRepo = wordRepo;
        this.wordGroupRepo = wordGroupRepo;
        this.wordMapper = wordMapper;
    }

    public Page<Word> getAll(int page, int size) {
        var params = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<WordEntity> entities = wordRepo.findAll(params);
        return entities.map(wordMapper::toModel);
    }

    public Word create(WordCreate word) {
        var entity = new WordEntity();

        if (word.getGroupId() != null) {
            var group = wordGroupRepo.findById(Long.parseLong(word.getGroupId()));
            group.ifPresent(entity::setGroup);
        }

        entity.setName(word.getName());
        entity.setAssociate(word.getAssociate());
        entity.setDefinition(word.getDefinition());

        return wordMapper.toModel(wordRepo.save(entity));
    }

    public Word update(WordCreate word, Long wordId) {
        var repoEntity = wordRepo.findById(wordId);

        if (repoEntity.isEmpty()) {
            throw new EntityNotFoundException();
        }

        var entity = repoEntity.get();

        if (word.getGroupId() != null) {
            var group = wordGroupRepo.findById(Long.parseLong(word.getGroupId()));
            group.ifPresent(entity::setGroup);
        }

        entity.setName(word.getName());
        entity.setDefinition(word.getDefinition());
        entity.setDone(word.getDone());
        entity.setRank(word.getRank());

        return wordMapper.toModel(wordRepo.save(entity));
    }
}
