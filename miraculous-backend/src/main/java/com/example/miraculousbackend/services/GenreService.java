package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.AlbumLinkDto;
import com.example.miraculousbackend.dto.GenreDto;
import com.example.miraculousbackend.dto.PlayableTrackDto;
import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.Track;
import com.example.miraculousbackend.mappers.AlbumMapper;
import com.example.miraculousbackend.mappers.GenreMapper;
import com.example.miraculousbackend.mappers.TrackMapper;
import com.example.miraculousbackend.repositories.AlbumRepository;
import com.example.miraculousbackend.repositories.GenreRepository;
import com.example.miraculousbackend.repositories.TrackRepository;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GenreService {

    private GenreMapper genreMapper;
    private TrackRepository trackRepository;
    private AlbumRepository albumRepository;
    private GenreRepository genreRepository;
    private TrackMapper trackMapper;
    private AlbumMapper albumMapper;


    @Autowired
    public void setAlbumMapper(AlbumMapper albumMapper) {
        this.albumMapper = albumMapper;
    }

    @Autowired
    public void setTrackMapper(TrackMapper trackMapper) {
        this.trackMapper = trackMapper;
    }

    @Autowired
    public void setGenreRepository(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Autowired
    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    @Autowired
    public void setAlbumRepository(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Autowired
    public void setGenreMapper(GenreMapper genreMapper) {
        this.genreMapper = genreMapper;
    }


    @Transactional
    public ResponseEntity<?> getBest10TracksOfGenre(long genreId, long visitorId){

        if(genreRepository.findById(genreId).isPresent()){

            Pageable pageable = PageRequest.of(0,10, Sort.by("visitorsWhoLikedThisTrack"));
            Genre genre = genreRepository.findById(genreId).get();
            List<Track> trackList = trackRepository.findAllByGenresContaining(genre, pageable);
            List<PlayableTrackDto> dtos = trackList.stream().map(track ->
                    trackMapper.convertTrackEntityToPlayableTrackDto(track, visitorId)).collect(Collectors.toList());
            return new ResponseEntity<>(dtos, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("Genre not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getBest10AlbumsOfGenre(long genreId, long visitorId){

        if (genreRepository.findById(genreId).isPresent()){

            Pageable pageable = PageRequest.of(0,10, Sort.by("visitorsWhoLikedThisAlbum"));
            Genre genre = genreRepository.findById(genreId).get();
            List<Album> albums = albumRepository.findAllByGenresContaining(genre, pageable);
            List<AlbumLinkDto> dtos = albums.stream().map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, visitorId))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(dtos, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("Genre not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public long getNumberOfLikesOfGenre(long genreId){

        Genre genre = genreRepository.findById(genreId).get();

        long numberOfLikesInTracksOfGenre = trackRepository.findAll().stream().filter(track ->
                track.getGenres().contains(genre))
                .map(track -> track.getVisitorsWhoLikedThisTrack()).count();

        long numberOfLikesInAlbumsOfGenres = albumRepository.findAll().stream().filter(album ->
                album.getGenres().contains(genre))
                .map(album -> album.getVisitorsWhoLikedThisAlbum()).count();

        return numberOfLikesInAlbumsOfGenres + numberOfLikesInTracksOfGenre;
    }

    @Transactional
    public List<GenreDto> getAllGenres(){

        return genreRepository.findAll().stream().map(genre -> genreMapper.convertGenreEntityToGenreDtoWithNumberOfLikes(genre,0)).collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<?> getGenreById(long genreId){

        if (genreRepository.findById(genreId).isPresent()){

            Genre genre = genreRepository.findById(genreId).get();
            GenreDto genreDto = genreMapper.convertGenreEntityToGenreDtoWithoutLikes(genre);
            return new ResponseEntity<>(genreDto, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("Genre not found"), HttpStatus.NOT_FOUND);
        }
    }
}
