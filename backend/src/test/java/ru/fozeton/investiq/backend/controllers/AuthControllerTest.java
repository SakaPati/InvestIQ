package ru.fozeton.investiq.backend.controllers;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import ru.fozeton.investiq.backend.model.request.LoginUserRequest;
import ru.fozeton.investiq.backend.model.request.NewUserRequest;
import ru.fozeton.investiq.backend.model.response.JWTTokenResponse;
import ru.fozeton.investiq.backend.service.UserService;
import tools.jackson.databind.ObjectMapper;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.oneOf;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void registerSuccessTest() throws Exception {
        var request = new NewUserRequest();
        request.setUserName("Fozeton");
        request.setPassword("12345678");
        request.setEmail("test@gmail.com");

        var response = new JWTTokenResponse("fake-jwt-token");

        Mockito.when(userService.registerNewUser(any(NewUserRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("fake-jwt-token"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"   ", ""})
    void registerIncorrectUserNameTest(String badUserName) throws Exception {
        var request = new NewUserRequest();
        request.setUserName(badUserName);
        request.setPassword("12345678");
        request.setEmail("test@gmail.com");

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("validation_error"))
                .andExpect(jsonPath("$.message").value("Укажите имя пользователя"))
                .andExpect(jsonPath("$.timestamp").exists());

        Mockito.verify(userService, Mockito.never())
                .registerNewUser(any(NewUserRequest.class));
    }

    @ParameterizedTest
    @ValueSource(strings = {"123", "   ", "", "1234567"})
    void registerIncorrectPasswordTest(String badPassword) throws Exception {
        var request = new NewUserRequest();
        request.setUserName("Fozeton");
        request.setPassword(badPassword);
        request.setEmail("test@gmail.com");

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("validation_error"))
                .andExpect(jsonPath("$.message", is(oneOf("Пароль должен содержать минимум 8 символов", "Пароль не может быть пустым"))))
                .andExpect(jsonPath("$.timestamp").exists());

        Mockito.verify(userService, Mockito.never())
                .registerNewUser(any(NewUserRequest.class));
    }

    @ParameterizedTest
    @ValueSource(strings = {"ananas@", "   ", "", "1234567", "@gmail.com"})
    void registerIncorrectEmailTest(String badEmail) throws Exception {
        var request = new NewUserRequest();
        request.setUserName("Fozeton");
        request.setPassword("12345678");
        request.setEmail(badEmail);

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("validation_error"))
                .andExpect(jsonPath("$.message", is(oneOf("Некорректный формат email адреса", "Укажите email"))))
                .andExpect(jsonPath("$.timestamp").exists());

        Mockito.verify(userService, Mockito.never())
                .registerNewUser(any(NewUserRequest.class));
    }

    @Test
    void loginSuccessTest() throws Exception {
        var request = new LoginUserRequest();
        request.setEmail("test@gmail.com");
        request.setPassword("12345678");

        var response = new JWTTokenResponse("fake-jwt-token");

        Mockito.when(userService.loginUser(any(LoginUserRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("fake-jwt-token"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"ananas@", "   ", "", "1234567", "@gmail.com"})
    void loginIncorrectEmailTest(String badEmail) throws Exception {
        var request = new LoginUserRequest();
        request.setEmail(badEmail);
        request.setPassword("12345678");

        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("validation_error"))
                .andExpect(jsonPath("$.message", is(oneOf("Некорректный формат email адреса", "Укажите email"))))
                .andExpect(jsonPath("$.timestamp").exists());

        Mockito.verify(userService, Mockito.never())
                .loginUser(any(LoginUserRequest.class));
    }

    @ParameterizedTest
    @ValueSource(strings = {"123", "   ", "", "1234567"})
    void loginIncorrectPasswordTest(String badPassword) throws Exception {
        var request = new LoginUserRequest();
        request.setEmail("test@gmail.com");
        request.setPassword(badPassword);

        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("validation_error"))
                .andExpect(jsonPath("$.message", is(oneOf("Пароль должен содержать минимум 8 символов", "Введите пароль"))))
                .andExpect(jsonPath("$.timestamp").exists());

        Mockito.verify(userService, Mockito.never())
                .loginUser(any(LoginUserRequest.class));
    }
}