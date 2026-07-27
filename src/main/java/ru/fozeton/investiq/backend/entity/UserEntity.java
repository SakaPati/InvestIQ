package ru.fozeton.investiq.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    @Id
    private Long id;

    private String userName;
    private String password;
    private String email;

    @Setter(AccessLevel.NONE)
    private LocalDateTime createAt = LocalDateTime.now();
}
