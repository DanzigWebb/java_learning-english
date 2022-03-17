package com.example.demo.rest.word.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WordCreate {

    @NotNull
    String groupId;

    @NotNull
    String name;

    String definition;
    String associate;
    Boolean done;
    String rank;
}
