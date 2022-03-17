package com.example.demo.db.entities;

import com.example.demo.db.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "word")
@Getter
@Setter
public class WordEntity extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Lob
    private String definition;

    @Lob
    private String associate;

    private Boolean done;

    private String rank;

    @ManyToOne(fetch = FetchType.LAZY)
    private WordGroupEntity group;
}
