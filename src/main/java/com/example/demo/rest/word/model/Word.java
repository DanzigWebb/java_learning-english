package com.example.demo.rest.word.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Word {

    private String id;
    private String groupId;

    private String name;
    private String definition;
    private String associate;
    private Boolean done;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
