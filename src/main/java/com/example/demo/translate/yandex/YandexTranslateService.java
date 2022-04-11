package com.example.demo.translate.yandex;

import com.example.demo.translate.yandex.model.YandexTranslateRequest;
import com.example.demo.translate.yandex.model.YandexTranslateResponse;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Map;


@Service
public class YandexTranslateService {

    private final String url = "https://translate.api.cloud.yandex.net/translate/v2/translate";
    private final String defaultLang = "ru";
    private final String folderId = "b1gdgq56h8k4v6tsm6km";
    private final String yaToken = "t1.9euelZqUkoqamI6YkY6QnMeWyo2Vju3rnpWazpCdlp6Sip3IyoyYzZqTypvl9PdbIi5t-e8RMS3Q3fT3G1ErbfnvETEt0A.sP0A20UZcPVH531dOmvskzniR1VrdE0gj2IE_fF5CDyT3R06mIcwrjaZ_rpWJZyhq9bykdCjgQ4hkMAeRmv0CQ";

    private final RestTemplate restTemplate;

    public YandexTranslateService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public ResponseEntity<YandexTranslateResponse> getWord(String text) {
        var headers = createHeaders();
        var body = createBody(text);

        var entity = new HttpEntity<>(body, headers);
        return restTemplate.postForEntity(url, entity, YandexTranslateResponse.class);
    }

    private HttpHeaders createHeaders() {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setBearerAuth(yaToken);
        return headers;
    }

    private Map<String, Object> createBody(String text) {
        var map = new YandexTranslateRequest(
                new String[]{text},
                defaultLang
        ).toMap();
        map.put("folderId", folderId);

        return map;
    }
}
