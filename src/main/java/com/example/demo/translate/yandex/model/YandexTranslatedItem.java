package com.example.demo.translate.yandex.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class YandexTranslatedItem implements Serializable {
   public String text;
   public String detectedLanguageCode;
}
