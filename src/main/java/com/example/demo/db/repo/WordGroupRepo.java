package com.example.demo.db.repo;

import com.example.demo.db.entities.WordGroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordGroupRepo extends JpaRepository<WordGroupEntity, Long> {
}
