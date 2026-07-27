package ru.fozeton.investiq.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.fozeton.investiq.backend.model.request.LoginUserRequest;
import ru.fozeton.investiq.backend.model.request.NewUserRequest;
import ru.fozeton.investiq.backend.model.response.JWTTokenResponse;
import ru.fozeton.investiq.backend.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<JWTTokenResponse> register(@Valid @RequestBody NewUserRequest request) {
        return ResponseEntity.ok(userService.registerNewUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JWTTokenResponse> register(@Valid @RequestBody LoginUserRequest request) {
        return ResponseEntity.ok(userService.loginUser(request));
    }
}
