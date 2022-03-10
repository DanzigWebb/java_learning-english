package com.example.demo.rest.word.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Word {

    private Long id;
    private Long groupId;

    private String name;
    private String definition;
    private Boolean done;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
