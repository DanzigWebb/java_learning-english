package com.example.demo.rest.word;

import com.example.demo.rest.word.model.Word;
import com.example.demo.rest.word.model.WordCreate;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller("api/v1/word")
@Validated
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @PostMapping
    public @ResponseBody
    Word create(
            @Valid WordCreate word
    ) {
        return wordService.create(word);
    }

    @PutMapping(":id")
    public @ResponseBody
    Word update(
            @RequestParam Long id,
            @Valid WordCreate word
    ) {
        return wordService.update(word, id);
    }
}
