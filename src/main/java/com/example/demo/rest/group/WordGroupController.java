package com.example.demo.rest.group;

import com.example.demo.rest.group.model.WordGroup;
import com.example.demo.rest.group.model.WordGroupCreate;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/group")
@Validated
public class WordGroupController {

    private final WordGroupService wordGroupService;

    public WordGroupController(WordGroupService wordGroupService) {
        this.wordGroupService = wordGroupService;
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
        System.out.println("id");
        System.out.println(id);
        return wordGroupService.update(group, id);
    }
}
