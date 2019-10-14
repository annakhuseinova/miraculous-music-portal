package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.SiteVisitor;
import com.example.miraculousbackend.entities.Track;
import com.example.miraculousbackend.repositories.ArtistRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.repositories.TrackRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TrackMapper {

    private TrackRepository trackRepository;
    private ArtistRepository artistRepository;
    private SiteVisitorRepository siteVisitorRepository;

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Autowired
    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    public FullTrackInfoDto convertTrackEntityToFullTrackInfoDto(Track track, long visitorId){

        FullTrackInfoDto fullTrackInfoDto = new FullTrackInfoDto();
        fullTrackInfoDto.setId(track.getId());
        fullTrackInfoDto.setTitle(track.getTitle());
        fullTrackInfoDto.setArtistId(track.getArtist().getId());
        fullTrackInfoDto.setArtistLogin(track.getArtist().getLogin());
        if (track.getAlbum() != null){
            fullTrackInfoDto.setAlbumId(track.getAlbum().getId());
            fullTrackInfoDto.setAlbumTitle(track.getAlbum().getTitle());
        }
        if (siteVisitorRepository.findById(visitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(visitorId).get();

            if (track.getVisitorsWhoLikedThisTrack().contains(siteVisitor)) {
                fullTrackInfoDto.setLikedByCurrentVisitor(true);
            }else {
                fullTrackInfoDto.setLikedByCurrentVisitor(false);
            }
            if (siteVisitor.getCart().getListOfTracks().contains(track)){
                fullTrackInfoDto.setInCurrentVisitorCart(true);
            }else {
                fullTrackInfoDto.setInCurrentVisitorCart(false);
            }
        }else {
            fullTrackInfoDto.setInCurrentVisitorCart(false);
            fullTrackInfoDto.setLikedByCurrentVisitor(false);
        }
        fullTrackInfoDto.setDateOfRelease(track.getDateOfRelease());
        fullTrackInfoDto.setDuration(track.getLength());
        fullTrackInfoDto.setGenres(GenreToStringAndReverseConverter.convertGenreObjectsToStrings(track.getGenres()));
        fullTrackInfoDto.setDescription(track.getDescription());
        fullTrackInfoDto.setIsFree(track.getIsFree());
        fullTrackInfoDto.setPrice(track.getPrice());
        fullTrackInfoDto.setNumberOfLikes((long)track.getVisitorsWhoLikedThisTrack().size());
        if (fullTrackInfoDto.getIsFree()){
            fullTrackInfoDto.setAudioUrl(track.getUrlToTrackFullVersion());
        }else {
            fullTrackInfoDto.setAudioUrl(track.getUrlToTrackPreviewVersion());
        }
        fullTrackInfoDto.setCoverPictureUrlName(track.getCoverPicture().getImageUrl());
        fullTrackInfoDto.setSize(track.getSize());
        return fullTrackInfoDto;
    }

    public PlayableTrackDto convertTrackEntityToPlayableTrackDto(Track track, Long visitorId){

        PlayableTrackDto playableTrackDto = new PlayableTrackDto();
        playableTrackDto.setId(track.getId());
        playableTrackDto.setTitle(track.getTitle());
        playableTrackDto.setArtistId(track.getArtist().getId());
        playableTrackDto.setArtistLogin(track.getArtist().getLogin());
        playableTrackDto.setDateOfRelease(track.getDateOfRelease());

        if (siteVisitorRepository.findById(visitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(visitorId).get();

            if (track.getVisitorsWhoLikedThisTrack().contains(siteVisitor)) {
                playableTrackDto.setLikedByCurrentVisitor(true);
            }else {
                playableTrackDto.setLikedByCurrentVisitor(false);
            }
            if (siteVisitor.getCart().getListOfTracks().contains(track)){
                playableTrackDto.setInCartOfCurrentVisitor(true);
            }else {
                playableTrackDto.setInCartOfCurrentVisitor(false);
            }
        }else {
            playableTrackDto.setInCartOfCurrentVisitor(false);
        }

        if (track.getAlbum() == null){

            playableTrackDto.setAlbumId(null);
            playableTrackDto.setAlbumTitle(null);

        }else {

            playableTrackDto.setAlbumId(track.getAlbum().getId());
            playableTrackDto.setAlbumTitle(track.getAlbum().getTitle());
        }

        playableTrackDto.setDuration(track.getLength());
        playableTrackDto.setNumberOfLikes((long)track.getVisitorsWhoLikedThisTrack().size());

        if (track.getCoverPicture() == null){

            playableTrackDto.setCoverPictureUrlName(null);

        }else {
            playableTrackDto.setCoverPictureUrlName(track.getCoverPicture().getImageUrl());
        }
        playableTrackDto.setIsFree(track.getIsFree());
        if (playableTrackDto.getIsFree()){
            playableTrackDto.setAudioUrlName(track.getUrlToTrackFullVersion());
        }else {
            playableTrackDto.setAudioUrlName(track.getUrlToTrackPreviewVersion());
        }
        playableTrackDto.setPrice(track.getPrice());
        playableTrackDto.setGenres(GenreToStringAndReverseConverter.convertGenreObjectsToStrings(track.getGenres()));
        return playableTrackDto;
    }

    public TrackLinkDto convertTrackEntityToTrackLinkDto(Track track){

        TrackLinkDto trackLinkDto = new TrackLinkDto();
        trackLinkDto.setId(track.getId());
        trackLinkDto.setTitle(track.getTitle());
        trackLinkDto.setArtistId(track.getArtist().getId());
        trackLinkDto.setArtistLogin(track.getArtist().getLogin());
        if (track.getAlbum() != null){
            trackLinkDto.setAlbumId(track.getAlbum().getId());
            trackLinkDto.setAlbumTitle(track.getAlbum().getTitle());
        }
        trackLinkDto.setDuration(track.getLength());
        trackLinkDto.setNumberOfLikes((long)track.getVisitorsWhoLikedThisTrack().size());

        if (track.getCoverPicture() != null){
            trackLinkDto.setCoverPictureUrlName(track.getCoverPicture().getImageUrl());
        }else {
            trackLinkDto.setCoverPictureUrlName(null);
        }
        trackLinkDto.setIsFree(track.getIsFree());
        trackLinkDto.setGenres(GenreToStringAndReverseConverter.convertGenreObjectsToStrings(track.getGenres()));
        trackLinkDto.setPrice(track.getPrice());
        return trackLinkDto;
    }

    public Track convertAlbumTrackUploadDtoIntoTrackEntity(AlbumTrackUploadDto albumTrackUploadDto){

        Track track = new Track();
        track.setId(null);
        track.setArtist(siteVisitorRepository.findById(albumTrackUploadDto.getArtistId()).get());
        track.setIsFree(albumTrackUploadDto.getIsFree());
        track.setTitle(albumTrackUploadDto.getTitle());
        track.setLength(albumTrackUploadDto.getDuration());
        track.setSize(albumTrackUploadDto.getFullAlbumTrackVersionSize());
        track.setPrice(albumTrackUploadDto.getPrice());
        return track;
    }

    public Track convertTrackUploadDtoToTrackEntity(TrackUploadDto trackUploadDto, Album album){

        Track track = new Track();
        track.setId(null);
        track.setTitle(trackUploadDto.getTitle());
        track.setArtist(artistRepository.findById(trackUploadDto.getArtistId()).get());
        if (album != null){
            track.setAlbum(album);
        }else {
            track.setAlbum(null);
        }
        if (trackUploadDto.getDescription() != null && trackUploadDto.getDescription().length() != 0){
            track.setDescription(trackUploadDto.getDescription());
        }else {
            track.setDescription(null);
        }
        track.setDateOfRelease(trackUploadDto.getDateOfRelease());
        track.setIsFree(trackUploadDto.getIsFree());
        track.setPrice(trackUploadDto.getPrice());
        track.setSize(trackUploadDto.getSize());
        track.setLength(trackUploadDto.getLength());
        return track;
    }
}
