package com.example.demo.utils.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public abstract class BaseMapper<T, Y> {
    public List<T> entityListToModel(List<Y> list) {
        if (list == null) {
            return new ArrayList<>();
        }

        return list.stream()
                .map(this::toModel)
                .collect(Collectors.toList());
    }

    public abstract T toModel(Y entity);
}
