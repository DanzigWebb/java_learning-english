package com.example.demo.db.repo;

import com.example.demo.db.entities.WordEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface WordRepo extends JpaRepository<WordEntity, Long> {
    @Query("SELECT w FROM word w WHERE w.id = ?1 AND w.group.id = ?2")
    Optional<WordEntity> findByGroupId(Long wordId, Long groupId);

    @Query("SELECT w FROM word w WHERE UPPER(w.name) LIKE UPPER(?1)")
    Page<WordEntity> findAllByName(String name, Pageable pageable);
}
