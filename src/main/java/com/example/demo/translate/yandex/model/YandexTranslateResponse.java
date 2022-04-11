package com.example.demo.translate.yandex.model;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class YandexTranslateResponse implements Serializable {
    List<YandexTranslatedItem> translations;
}
