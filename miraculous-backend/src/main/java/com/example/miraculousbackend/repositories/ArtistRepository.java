package com.example.miraculousbackend.repositories;


import com.example.miraculousbackend.entities.Artist;
import com.example.miraculousbackend.entities.Genre;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {


    Optional<List<Artist>> findAllByIsFeatured(boolean isFeatured);

    Optional<Artist> findArtistByLogin(String login);

    List<Artist> findAllByLogin(String login);

    List<Artist> findByGenresContaining(Genre genre, Pageable pageable);
}
