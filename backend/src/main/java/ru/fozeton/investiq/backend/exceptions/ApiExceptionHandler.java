package ru.fozeton.investiq.backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.fozeton.investiq.backend.model.response.ErrorResponse;

import java.time.Instant;
import java.util.Objects;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntime(RuntimeException e) {
        log.error("Необработанное исключение: ", e);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "internal_error", "Произошла внутренняя ошибка сервера");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception e) {
        log.error("Непредвиденная ошибка: ", e);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "server_error", e.getMessage());
    }

    @ExceptionHandler(EmailBusyException.class)
    public ResponseEntity<ErrorResponse> handleEmailBusyException(EmailBusyException e) {
        log.error("Ошибка занятой почты: ", e);
        return buildResponse(HttpStatus.BAD_REQUEST, "email_error", e.getMessage());
    }

    @ExceptionHandler({UserNotFoundException.class, IncorrectPasswordException.class})
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(RuntimeException e) {
        log.error("Ошибка авторизации/поиска пользователя: {}", e.getMessage(), e);
        return buildResponse(HttpStatus.NOT_FOUND, "user_not_found_error", e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e) {
        String errorMessage = e.getBindingResult().getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .filter(Objects::nonNull)
                .findFirst()
                .orElse("Ошибка валидации входящих данных");

        return buildResponse(HttpStatus.BAD_REQUEST, "validation_error", errorMessage);
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus status, String error, String message) {
        if (status.is4xxClientError()) log.warn("API Warning: {} - {}", error, message);
        else log.error("API Error: {} - {}", error, message);

        ErrorResponse response = new ErrorResponse(
                error,
                message,
                Instant.now().toEpochMilli()
        );
        return new ResponseEntity<>(response, status);
    }
}