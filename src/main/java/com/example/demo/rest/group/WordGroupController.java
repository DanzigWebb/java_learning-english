package com.example.demo.rest.group;

import com.example.demo.rest.group.model.WordGroup;
import com.example.demo.rest.group.model.WordGroupCreate;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("api/v1/group")
@Validated
public class WordGroupController {

    private final WordGroupService wordGroupService;

    public WordGroupController(WordGroupService wordGroupService) {
        this.wordGroupService = wordGroupService;
    }

    @GetMapping
    public @ResponseBody
    List<WordGroup> getAll() {
        return wordGroupService.getAll();
    }

    @PostMapping
    public @ResponseBody
    WordGroup create(
            @Valid @RequestBody WordGroupCreate group
    ) {
        return wordGroupService.create(group);
    }

    @PutMapping("{id}")
    public @ResponseBody
    WordGroup update(
            @NotNull @PathVariable Long id,
            @Valid @RequestBody WordGroupCreate group
    ) {
        return wordGroupService.update(group, id);
    }
}
