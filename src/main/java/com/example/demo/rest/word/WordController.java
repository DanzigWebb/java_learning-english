package com.example.demo.rest.word;

import com.example.demo.rest.word.model.Word;
import com.example.demo.rest.word.model.WordCreate;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller()
@RequestMapping("api/v1/word")
@Validated
public class WordController {

    private final WordService wordService;

    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @PostMapping
    public @ResponseBody
    Word create(
            @Valid @RequestBody WordCreate word
    ) {
        return wordService.create(word);
    }

    @PutMapping("/{id}")
    public @ResponseBody
    Word update(
            @NotNull @PathVariable Long id,
            @Valid @RequestBody WordCreate word
    ) {
        return wordService.update(word, id);
    }
}
