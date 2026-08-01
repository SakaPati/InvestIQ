package ru.fozeton.investiq.backend.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginUserRequest {
    @NotBlank(message = "Укажите email")
    @Email(message = "Некорректный формат email адреса")
    private String email;

    @NotBlank(message = "Введите пароль")
    @Size(min = 8, message = "Пароль должен содержать минимум 8 символов")
    private String password;
}