package com.example.miraculousbackend.repositories;

import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.Track;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

    List<Genre> findAll();

    Optional<Genre> findById(Long aLong);

    @Query("SELECT g.tracks FROM Genre g WHERE g.id=:id")
    List<Track> getSimilarTracksByTrackId(@Param("id") long id, Pageable pageable);

    @Query("SELECT g.albums FROM Genre g WHERE g.id =:id")
    List<Album> getSimilarAlbumsByAlbumId(@Param("id") long id, Pageable pageable);

}
