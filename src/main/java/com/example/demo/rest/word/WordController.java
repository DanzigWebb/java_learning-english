package com.example.demo.rest.word;

import com.example.demo.rest.word.model.Word;
import com.example.demo.rest.word.model.WordCreate;
import com.example.demo.translate.yandex.YandexTranslateService;
import com.example.demo.translate.yandex.model.YandexTranslateResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller()
@RequestMapping("api/v1/word")
@Validated
public class WordController {

    private final WordService wordService;
    private final YandexTranslateService yandexTranslateService;

    public WordController(WordService wordService, YandexTranslateService yandexTranslateService) {
        this.wordService = wordService;
        this.yandexTranslateService = yandexTranslateService;
    }

    @PostMapping
    public @ResponseBody
    Word create(
            @Valid @RequestBody WordCreate word
    ) {
        if (word.getDefinition() == null || word.getDefinition().isEmpty()) {
            var definition = yandexTranslateService.getWord(word.getName()).getBody();
            word.setDefinition(definition != null ? definition.getTranslations().get(0).getText() : null);
        }
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

    @GetMapping("/all")
    public @ResponseBody
    Page<Word> getAll(
            @RequestParam int page,
            @RequestParam int size
    ) {
        return wordService.getAll(page, size);
    }

    @GetMapping("/translate")
    public @ResponseBody
    YandexTranslateResponse translate(
            @RequestParam String word
    ) {
        var isValid = word != null && word.length() > 0;
        if (!isValid) {
            return null;
        }

        return yandexTranslateService
                .getWord(word)
                .getBody();
    }
}
