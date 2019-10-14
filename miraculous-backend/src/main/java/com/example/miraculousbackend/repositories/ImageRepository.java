package com.example.miraculousbackend.repositories;

import com.example.miraculousbackend.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<Image> findByImageUrl(String imageUrl);

    void deleteByImageUrl(String imageUrl);
}
