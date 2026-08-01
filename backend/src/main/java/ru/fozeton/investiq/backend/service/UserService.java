package ru.fozeton.investiq.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.fozeton.investiq.backend.entity.UserEntity;
import ru.fozeton.investiq.backend.exceptions.EmailBusyException;
import ru.fozeton.investiq.backend.exceptions.IncorrectPasswordException;
import ru.fozeton.investiq.backend.exceptions.UserNotFoundException;
import ru.fozeton.investiq.backend.model.request.LoginUserRequest;
import ru.fozeton.investiq.backend.model.request.NewUserRequest;
import ru.fozeton.investiq.backend.model.response.JWTTokenResponse;
import ru.fozeton.investiq.backend.repository.UserRepository;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final String secret = "super_puper_mega_secret_key_1234567890_pet_project";
    private final SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    private final long thirtyDaysInMs = 30L * 24 * 60 * 60 * 1000;

    public JWTTokenResponse registerNewUser(@Valid NewUserRequest request) {
        String email = request.getEmail();
        if (userRepository.existsByEmail(email)) {
            throw new EmailBusyException("This email is already taken, try another email address.");
        }

        UserEntity user = new UserEntity();
        String userName = request.getUserName();
        user.setUserName(userName);
        user.setPassword(request.getPassword());
        user.setEmail(email);

        userRepository.save(user);

        return new JWTTokenResponse(generationJwtToken(userName, email));
    }

    public JWTTokenResponse loginUser(@Valid LoginUserRequest request) {
        UserEntity user = userRepository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found. You may have entered an incorrect login or password."));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IncorrectPasswordException("User not found. You may have entered an incorrect login or password.");
        }

        return new JWTTokenResponse(generationJwtToken(user.getUserName(), user.getEmail()));
    }

    private String generationJwtToken(String userName, String email) {
        return Jwts.builder()
                .subject(userName)
                .claim("email", email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + thirtyDaysInMs))
                .signWith(key)
                .compact();
    }
}
