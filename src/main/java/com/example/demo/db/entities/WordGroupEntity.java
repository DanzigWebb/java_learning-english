package com.example.demo.db.entities;

import com.example.demo.db.base.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity(name = "word_group")
@Getter
@Setter
public class WordGroupEntity extends BaseEntity {

    private String name;

    private Date done;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<WordEntity> words;
}
