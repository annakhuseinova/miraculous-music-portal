package com.example.miraculousbackend.repositories;

import com.example.miraculousbackend.entities.Role;
import com.example.miraculousbackend.entities.SiteVisitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SiteVisitorRepository extends JpaRepository<SiteVisitor, Long> {

    Optional<SiteVisitor> findByLogin(String login);
    boolean existsByLogin(String login);
    boolean existsByEmail(String email);
    Optional<SiteVisitor> findByActivationCode(String activationCode);
    boolean existsByActivationCode(String activationCode);
    List<SiteVisitor> findAllByRolesContaining(Role role);
}
