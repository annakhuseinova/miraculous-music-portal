package com.example.miraculousbackend.repositories;

import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.Track;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

    List<Track> findAllByArtistId(long artistId);
    List<Track> findAllByTitle(String title);
    boolean existsAllById(Collection<Long> ids);
    List<Track> findAllById(Collection<Long> ids);

    @Query(value = "SELECT track FROM Track track where track.isFree = TRUE ORDER BY size(track.visitorsWhoLikedThisTrack) desc")
    List<Track> getTopFreeTracks(Pageable pageable);

    @Query(value = "SELECT track FROM Track track WHERE track.isFree = FALSE ORDER BY size(track.visitorsWhoLikedThisTrack) desc")
    List<Track> getTopTracks(Pageable pageable);

    List<Track> findAllByGenresContaining(Genre genre, Pageable pageable);
}
