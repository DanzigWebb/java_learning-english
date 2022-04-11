package com.example.demo.translate.yandex.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Data
public class YandexTranslateRequest {
    String[] texts;
    String targetLanguageCode;

    public Map<String, Object> toMap() {
        var map = new HashMap<String, Object>();
        map.put("texts", texts);
        map.put("targetLanguageCode", targetLanguageCode);

        return map;
    }
}
