package ru.fozeton.investiq.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.fozeton.investiq.backend.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsByEmail(String email);
    Optional<UserEntity> findUserByEmail(String email);
}
