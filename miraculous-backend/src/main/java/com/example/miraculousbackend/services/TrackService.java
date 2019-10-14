package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.entities.*;
import com.example.miraculousbackend.mappers.CommentMapper;
import com.example.miraculousbackend.mappers.GenreMapper;
import com.example.miraculousbackend.mappers.TrackMapper;
import com.example.miraculousbackend.repositories.GenreRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.repositories.TrackRepository;
import com.example.miraculousbackend.utils.ResponseMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrackService {

    private TrackRepository trackRepository;
    private TrackMapper trackMapper;
    private CommentMapper commentMapper;
    private GenreRepository genreRepository;
    private SiteVisitorRepository siteVisitorRepository;
    private GenreMapper genreMapper;
    private FileStorageService fileStorageService;

    @Value("${music.tracks.upload.path}")
    private String trackUploadDirectoryPath;

    @Value("${music.images.upload.path}")
    private String imageUploadDirectoryPath;

    @Autowired
    public void setFileStorageService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @Autowired
    public void setGenreMapper(GenreMapper genreMapper) {
        this.genreMapper = genreMapper;
    }

    @Autowired
    public void setCommentMapper(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Autowired
    public void setGenreRepository(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Autowired
    public void setTrackMapper(TrackMapper trackMapper) {
        this.trackMapper = trackMapper;
    }

    @Autowired
    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    @Transactional
    public List<PlayableTrackDto> getTop10FreeTracks(long visitorId){

        Pageable pageable = PageRequest.of(0,10);
        List<Track> tracks = trackRepository.getTopFreeTracks(pageable);
        return tracks.stream().map(track -> trackMapper.convertTrackEntityToPlayableTrackDto(track, visitorId)).collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<?> putOrRemoveLikeFromTrack(TrackLikeDto trackLikeDto){

        if (siteVisitorRepository.findById(trackLikeDto.getSiteVisitorId()).isPresent()){
            if (trackRepository.findById(trackLikeDto.getTrackId()).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(trackLikeDto.getSiteVisitorId()).get();
                Track track = trackRepository.findById(trackLikeDto.getTrackId()).get();
                if (track.getVisitorsWhoLikedThisTrack().contains(siteVisitor)){

                    track.getVisitorsWhoLikedThisTrack().remove(siteVisitor);
                    trackRepository.save(track);
                    trackLikeDto.setTrackLikedByCurrentVisitor(false);
                    trackLikeDto.setNumberOfLikes(trackRepository.findById(trackLikeDto.getTrackId()).get()
                            .getVisitorsWhoLikedThisTrack().size());
                    return new ResponseEntity<>(trackLikeDto, HttpStatus.OK);

                }else {

                    track.getVisitorsWhoLikedThisTrack().add(siteVisitor);
                    trackRepository.save(track);
                    trackLikeDto.setTrackLikedByCurrentVisitor(true);
                    trackLikeDto.setNumberOfLikes(trackRepository.findById(trackLikeDto.getTrackId()).get()
                            .getVisitorsWhoLikedThisTrack().size());
                    return new ResponseEntity<>(trackLikeDto, HttpStatus.OK);
                }

            }else {

                return new ResponseEntity<>(new ResponseMessage("Track not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public Track saveTrack(Track track){

        return trackRepository.save(track);
    }

    @Transactional
    public ResponseEntity<?> uploadTrack(TrackUploadDto trackUploadDto,
                                         MultipartFile trackFullVersionFile,
                                         MultipartFile trackPreviewVersionFile,
                                         MultipartFile trackCover,
                                         List<GenreDto> trackGenres,
                                         Album album){

        try {

            List<Genre> genres = trackGenres.stream().map(genreDto -> genreMapper.convertGenreDtoToGenreEntity(genreDto))
                    .collect(Collectors.toList());
            if (siteVisitorRepository.findById(trackUploadDto.getArtistId()).isPresent()){

                Track track = trackMapper.convertTrackUploadDtoToTrackEntity(trackUploadDto, album);
                fileStorageService.storeTrack(trackFullVersionFile, trackPreviewVersionFile, track, trackCover, genres);
                return new ResponseEntity<>(new ResponseMessage("Successfully Uploaded Track" + track.getTitle()), HttpStatus.OK);

            }else {

                return new ResponseEntity<>(new ResponseMessage("Artist "+ trackUploadDto.getTitle() + "does not exist"), HttpStatus.NOT_FOUND);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ResponseMessage("Failed to upload track"), HttpStatus.EXPECTATION_FAILED);
    }

    @Transactional
    public long getNumberOfUploadedTracks(){

        return trackRepository.count();
    }

    @Transactional
    public ResponseEntity<?> getFullTrackInfo(long trackId, long visitorId){

        if (trackRepository.findById(trackId).isPresent()){

            FullTrackInfoDto fullTrackInfoDto = trackMapper.convertTrackEntityToFullTrackInfoDto(trackRepository.findById(trackId).get(), visitorId);
            return new ResponseEntity<>(fullTrackInfoDto, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("Track not found"), HttpStatus.NOT_FOUND);
        }

    }

    @Transactional
    public ResponseEntity<?> saveTrackComment(CommentDispatchDto commentDispatchDto){

        if (trackRepository.findById(commentDispatchDto.getTrackId()).isPresent()){

            Comment comment = commentMapper.convertCommentDispatchDtoToCommentEntity(commentDispatchDto);
            Track track = trackRepository.findById(commentDispatchDto.getTrackId()).get();
            track.getComments().add(comment);
            trackRepository.save(track);
            return new ResponseEntity<>(HttpStatus.OK);
        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getTrackComments(long trackId){

        if(trackRepository.findById(trackId).isPresent()){

            List<Comment> comments = trackRepository.findById(trackId).get().getComments();
            List<CommentRetrievalDto> commentRetrievalDtos = comments.stream().map(comment ->
                    commentMapper.convertCommentEntityToCommentRetrievalDto(comment)).collect(Collectors.toList());
            return new ResponseEntity<>(commentRetrievalDtos, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public List<TrackLinkDto> getSimilarTracks(long trackId){

        Pageable pageable = PageRequest.of(0,10);
        if (trackRepository.findById(trackId).isPresent()){
            Genre genre = trackRepository.findById(trackId).get().getGenres().get(0);
            List<Track> similarTracks = genreRepository.getSimilarTracksByTrackId(genre.getId(), pageable);
            Collections.shuffle(similarTracks);
            return similarTracks.stream().map(track -> trackMapper.convertTrackEntityToTrackLinkDto(track)).collect(Collectors.toList());
        }

        throw new EntityNotFoundException("The track does not exist");
    }

    @Transactional
    public List<PlayableTrackDto> getTop15TracksByLikes(long visitorId) {

        Pageable pageable = PageRequest.of(0,15);
        List<Track> tracks = trackRepository.getTopTracks(pageable);
        return tracks.stream().map(track -> trackMapper.convertTrackEntityToPlayableTrackDto(track, visitorId)).collect(Collectors.toList());
    }
}
