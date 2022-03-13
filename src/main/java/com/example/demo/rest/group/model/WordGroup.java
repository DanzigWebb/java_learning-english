package com.example.demo.rest.group.model;

import com.example.demo.rest.word.model.Word;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class WordGroup {
    private String id;
    private String name;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Boolean done;
    private Boolean archived;
    private List<Word> words;
}
