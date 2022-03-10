package com.example.demo.rest.word.model;

import lombok.Data;

@Data
public class WordCreate {
    String name;
    String definition;
    Boolean done;
}
