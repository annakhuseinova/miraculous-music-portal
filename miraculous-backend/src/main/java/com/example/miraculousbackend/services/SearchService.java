package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.AlbumLinkDto;
import com.example.miraculousbackend.dto.ArtistLinkDto;
import com.example.miraculousbackend.dto.TrackLinkDto;
import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.Artist;
import com.example.miraculousbackend.entities.Track;
import com.example.miraculousbackend.mappers.AlbumMapper;
import com.example.miraculousbackend.mappers.ArtistMapper;
import com.example.miraculousbackend.mappers.TrackMapper;
import com.example.miraculousbackend.repositories.AlbumRepository;
import com.example.miraculousbackend.repositories.ArtistRepository;
import com.example.miraculousbackend.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private AlbumRepository albumRepository;
    private AlbumMapper albumMapper;
    private TrackRepository trackRepository;
    private TrackMapper trackMapper;
    private ArtistRepository artistRepository;
    private ArtistMapper artistMapper;

    @Autowired
    public void setArtistMapper(ArtistMapper artistMapper) {
        this.artistMapper = artistMapper;
    }

    @Autowired
    public void setAlbumMapper(AlbumMapper albumMapper) {
        this.albumMapper = albumMapper;
    }

    @Autowired
    public void setTrackMapper(TrackMapper trackMapper) {
        this.trackMapper = trackMapper;
    }

    @Autowired
    public void setAlbumRepository(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Autowired
    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Transactional
    public ResponseEntity<?> getSearchResults(String keyword){

        HashMap<String, List<?>> searchResults = new HashMap<>();
        searchResults.put("foundArtists", getArtistsSearchResults(keyword));
        searchResults.put("foundAlbums", getAlbumsSearchResults(keyword));
        searchResults.put("foundTracks", getTracksSearchResults(keyword));
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

    @Transactional
    public List<AlbumLinkDto> getAlbumsSearchResults(String albumTitle){

        List<Album> albums = albumRepository.findAllByTitle(albumTitle);
        return albums.stream().map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, -1)).collect(Collectors.toList());
    }

    @Transactional
    List<TrackLinkDto> getTracksSearchResults(String trackTitle){

        List<Track> tracks = trackRepository.findAllByTitle(trackTitle);
        return tracks.stream().map(track -> trackMapper.convertTrackEntityToTrackLinkDto(track)).collect(Collectors.toList());
    }

    @Transactional
    public List<ArtistLinkDto> getArtistsSearchResults(String login){

        List<Artist> artists = artistRepository.findAllByLogin(login);
        return artists.stream().map(artist -> artistMapper.convertArtistEntityToArtistLinkDto(artist)).collect(Collectors.toList());
    }
}
