package ru.fozeton.investiq.backend.model.response;

public record ErrorResponse(String error, String message, long timestamp) {}