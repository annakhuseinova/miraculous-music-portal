package com.example.miraculousbackend.repositories;

import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.Genre;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    List<Album> findAllByIsFeatured(boolean isFeatured);

    List<Album> findAllByGenresContaining(Genre genre, Pageable pageable);

    List<Album> findAllByArtistId(long artistId);

    List<Album> findAllByArtistLogin(String login);

    List<Album> findAllByTitle(String title);

    @Query(value ="SELECT album FROM Album album WHERE album.isFree = true ORDER BY size(album.visitorsWhoLikedThisAlbum) desc")
    List<Album> getTopFreeAlbums(Pageable pageable);

    @Query(value = "SELECT album FROM Album album ORDER BY size(album.visitorsWhoLikedThisAlbum) desc")
    List<Album> getTopAlbums(Pageable pageable);

}
