package com.example.demo.db.repo;

import com.example.demo.db.entities.WordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepo extends JpaRepository<WordEntity, Long> {
}
