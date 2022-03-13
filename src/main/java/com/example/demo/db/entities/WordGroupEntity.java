package com.example.demo.db.entities;

import com.example.demo.db.base.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "word_group")
@Getter
@Setter
public class WordGroupEntity extends BaseEntity {

    @NotBlank
    private String name;

    @Column(columnDefinition = "boolean default false")
    private Boolean done;

    @Column(columnDefinition = "boolean default false")
    private Boolean archived;

    @OneToMany(mappedBy = "group", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<WordEntity> words;
}
