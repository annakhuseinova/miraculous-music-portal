package com.example.miraculousbackend.services;

import com.example.miraculousbackend.comparators.ArtistByTotalNumberOfLikesComparator;
import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.entities.*;
import com.example.miraculousbackend.mappers.*;
import com.example.miraculousbackend.repositories.*;
import com.example.miraculousbackend.utils.ResponseMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
@Slf4j
public class ArtistService {

    private ImageService imageService;
    private FileStorageService fileStorageService;
    private ArtistRepository artistRepository;
    private GenreMapper genreMapper;
    private ArtistMapper artistMapper;
    private AlbumMapper albumMapper;
    private TrackMapper trackMapper;
    private CommentMapper commentMapper;
    private TrackRepository trackRepository;
    private AlbumRepository albumRepository;
    private SiteVisitorRepository siteVisitorRepository;
    private EventMapper eventMapper;
    private ImageRepository imageRepository;
    private RoleRepository roleRepository;
    private GenreRepository genreRepository;
    private EventService eventService;

    @Autowired
    public void setEventService(EventService eventService) {
        this.eventService = eventService;
    }

    @Autowired
    public void setGenreRepository(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setImageRepository(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Autowired
    public void setFileStorageService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @Autowired
    public void setImageService(ImageService imageService) {
        this.imageService = imageService;
    }

    @Autowired
    public void setGenreMapper(GenreMapper genreMapper) {
        this.genreMapper = genreMapper;
    }

    @Autowired
    public void setEventMapper(EventMapper eventMapper) {
        this.eventMapper = eventMapper;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
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
    public void setCommentMapper(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    @Autowired
    public void setTrackMapper(TrackMapper trackMapper) {
        this.trackMapper = trackMapper;
    }

    @Autowired
    public void setAlbumMapper(AlbumMapper albumMapper) {
        this.albumMapper = albumMapper;
    }

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Autowired
    public void setArtistMapper(ArtistMapper artistMapper) {
        this.artistMapper = artistMapper;
    }

    @Transactional
    public ResponseEntity<?> addNewEvent(EventDispatchDto eventDispatchDto, MultipartFile multipartFile){

        try {

            if (siteVisitorRepository.findById(eventDispatchDto.getArtistId()).isPresent()){

                Event event = eventMapper.convertEventDispatchDtoToEventEntity(eventDispatchDto);

                if (multipartFile == null){

                    event.setCoverImage(null);

                }else {

                    event.setCoverImage(fileStorageService.storeImage(multipartFile));
                }
                eventService.saveEvent(event);

                return new ResponseEntity<>(new ResponseMessage("Successfully saved event " +
                        eventDispatchDto.getEventTitle()), HttpStatus.OK);

            }else {

                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }

    @Transactional
    public ResponseEntity<?> get10ArtistsOfGenreByGenreId(long genreId){

        if (genreRepository.findById(genreId).isPresent()){

            Genre genre = genreRepository.findById(genreId).get();
            Pageable pageable = PageRequest.of(0,10);
            List<Artist> artistsOfGenre = artistRepository.findByGenresContaining(genre, pageable);
            List<ArtistLinkDto> artistLinkDtoList = artistsOfGenre.stream()
                    .map(artist -> artistMapper.convertArtistEntityToArtistLinkDto(artist)).collect(Collectors.toList());
            return new ResponseEntity<>(artistLinkDtoList, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("Genre not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteArtistPhoto(String imageUrl, long artistId){

        if (siteVisitorRepository.findById(artistId).isPresent()){

            if (imageRepository.findByImageUrl(imageUrl).isPresent()){

                Artist artist = artistRepository.findById(artistId).get();
                imageService.deleteImageByImageUrl(imageUrl);
                try {
                    fileStorageService.deleteImageFromImageByImageUrlName(imageUrl);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                artist.setPicture(null);
                artistRepository.save(artist);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {

                return new ResponseEntity<>(new ResponseMessage("Image not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("Artist not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public Artist saveArtist(Artist artist){

        return artistRepository.save(artist);
    }

    @Transactional
    public ResponseEntity<?> updateArtistSettings(MultipartFile coverPictureFile, ArtistSettingsDto artistSettingsDto, List<GenreDto> genreDtos){

        try {

            if (siteVisitorRepository.findById(artistSettingsDto.getId()).isPresent()){

                Artist artist = artistMapper.convertArtistSettingsDtoToArtistEntity(artistSettingsDto);
                List<Genre> genres = genreDtos.stream().map(genreDto -> genreMapper.convertGenreDtoToGenreEntity(genreDto))
                        .collect(Collectors.toList());
                artist.setGenres(genres);

                if (coverPictureFile != null){
                    if (artist.getPicture() != null){

                        fileStorageService.deleteImageFromImageByImageUrlName(artist.getPicture().getImageUrl());
                        imageService.deleteImageById(artist.getPicture().getId());
                    }

                    artist.setPicture(fileStorageService.storeImage(coverPictureFile));
                }
                saveArtist(artist);
                return new ResponseEntity<>(artistMapper.convertArtistEntityIntoArtistSettingsDto(artist), HttpStatus.OK);

            }else {

                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }

    @Transactional
    public ResponseEntity<List<EventRetrievalDto>> getArtistEvents(long artistId){

        if (siteVisitorRepository.findById(artistId).isPresent()){

            List<Event> events = artistRepository.findById(artistId).get().getEvents();
            List<EventRetrievalDto> eventRetrievalDtos = events.stream().map(event ->
                    eventMapper.convertEventEntityToEventRetrievalDto(event)).collect(Collectors.toList());
            return new ResponseEntity<>(eventRetrievalDtos, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getArtistSettings(long artistId){

        if (siteVisitorRepository.findById(artistId).isPresent()){

            Artist artist = artistRepository.findById(artistId).get();
            return new ResponseEntity<>(artistMapper.convertArtistEntityIntoArtistSettingsDto(artist), HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getArtistByArtistLogin(String artistLogin){

        if (artistRepository.findArtistByLogin(artistLogin).isPresent()){

            ArtistLinkDto artistLinkDto = artistMapper.convertArtistEntityToArtistLinkDto(artistRepository.
                    findArtistByLogin(artistLogin).get());

            return new ResponseEntity<>(artistLinkDto, HttpStatus.OK );

        }else {

            return new ResponseEntity<>("The artist " + artistLogin + " does not exist", HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public List<ArtistLinkDto> getFeaturedArtists(){

        if (artistRepository.findAllByIsFeatured(true).isPresent()){

            return artistRepository.findAllByIsFeatured(true).get().stream().limit(10)
                    .map(artist -> artistMapper.convertArtistEntityToArtistLinkDto(artist)).collect(Collectors.toList());
        }else {

            return Collections.emptyList();
        }
    }

    @Transactional
    public ResponseEntity<ResponseMessage> addArtistToFeatured(long artistId){

        if (artistRepository.findById(artistId).isPresent()){

            Artist artist = artistRepository.findById(artistId).get();
            artist.setIsFeatured(true);
            artistRepository.save(artist);
            return new ResponseEntity<>(new ResponseMessage(artist.getLogin() + " has been added to featured"), HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<ResponseMessage> deleteArtistFromFeatured(long artistId){

        if (artistRepository.findById(artistId).isPresent()){

            Artist artist = artistRepository.findById(artistId).get();
            artist.setIsFeatured(false);
            artistRepository.save(artist);
            return new ResponseEntity<>(new ResponseMessage(artist.getLogin() + " has been deleted from featured"), HttpStatus.OK);

        }else {

            throw new EntityNotFoundException("The artist does not exist");
        }

    }

    @Transactional
    public ResponseEntity<?> deleteArtistById(long artistId){

        if (siteVisitorRepository.findById(artistId).isPresent()){

            artistRepository.deleteById(artistId);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @Transactional
    public long getNumberOfRegisteredArtists(){
        return artistRepository.count();
    }

    @Transactional
    public ResponseEntity<?> getArtistProfileInfoById(long artistId, long totalNumberOfArtistLikes){

        if (siteVisitorRepository.findById(artistId).isPresent()){

            Artist artist = artistRepository.findById(artistId).get();
            ArtistProfileDto artistProfileDto = artistMapper.convertArtistEntityToArtistProfileDto(artist, totalNumberOfArtistLikes);
            return new ResponseEntity<>(artistProfileDto, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public long getTotalNumberOfArtistLikes(long artistId){

        List<Album> artistAlbums = albumRepository.findAllByArtistId(artistId);
        List<Track> artistTracks = trackRepository.findAllByArtistId(artistId);
        long numberOfAlbumLikes = artistAlbums.stream().map(Album::getVisitorsWhoLikedThisAlbum).count();
        long numberOfTrackLikes = artistTracks.stream().map(Track::getVisitorsWhoLikedThisTrack).count();
        return numberOfAlbumLikes + numberOfTrackLikes;
    }

    @Transactional
    public ResponseEntity<?> getAllTracksOfArtistByArtistId(long artistId, long visitorId){


        if (siteVisitorRepository.findById(artistId).isPresent()){

            List<Track> listOfAllTracksOfArtist = trackRepository.findAllByArtistId(artistId);
            List<PlayableTrackDto> playableTrackDtoList = listOfAllTracksOfArtist.stream().map(track ->
                    trackMapper.convertTrackEntityToPlayableTrackDto(track, visitorId))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(playableTrackDtoList, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getAllAlbumsOfArtistByArtistId(long artistId, long visitorId){

        if (siteVisitorRepository.findById(artistId).isPresent()){

            List<Album>  listOfAllAlbumsOfArtist = albumRepository.findAllByArtistId(artistId);
            List<AlbumLinkDto> albumLinkDtoList = listOfAllAlbumsOfArtist.stream().map(album ->
                    albumMapper.convertAlbumEntityToAlbumLinkDto(album,visitorId))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(albumLinkDtoList, HttpStatus.OK);
        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getAllAlbumsOfArtistByArtistLogin(String login, long visitorId){

        if (artistRepository.findArtistByLogin(login).isPresent()){

            List<Album> listOfAllAlbumsOfArtists = albumRepository.findAllByArtistLogin(login);
            List<AlbumLinkDto> listOfAlbumLinkDtos = listOfAllAlbumsOfArtists.stream().map(album -> albumMapper
                    .convertAlbumEntityToAlbumLinkDto(album, visitorId)).collect(Collectors.toList());
            return new ResponseEntity<>(listOfAlbumLinkDtos, HttpStatus.OK);

        }else{

            return new ResponseEntity<>(new ResponseMessage(login + "not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public List<ArtistLinkDto> getTop15ArtistsByLikes(){

         List<SiteVisitor> artists = siteVisitorRepository.findAllByRolesContaining(roleRepository.findById(2L).get())
                 .stream().sorted(new ArtistByTotalNumberOfLikesComparator()).limit(1).collect(Collectors.toList());
         List<Artist> artistList = artists.stream().map(siteVisitor -> (Artist)siteVisitor).collect(Collectors.toList());
         System.out.println(artistList.size());
         return artistList.stream().map(artist -> artistMapper.convertArtistEntityToArtistLinkDto(artist)).collect(Collectors.toList());

    }

    @Transactional
    public ResponseEntity<?> saveArtistComment(CommentDispatchDto commentDispatchDto){

        if (siteVisitorRepository.findById(commentDispatchDto.getArtistId()).isPresent()){

            Comment comment = commentMapper.convertCommentDispatchDtoToCommentEntity(commentDispatchDto);
            Artist artist = artistRepository.findById(commentDispatchDto.getArtistId()).get();
            artist.getComments().add(comment);
            artistRepository.save(artist);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getArtistComments(long artistId){


        if (siteVisitorRepository.findById(artistId).isPresent()){

            List<Comment> comments = artistRepository.findById(artistId).get().getComments();
            System.out.println(comments.size());
            List<CommentRetrievalDto> commentRetrievalDtos = comments.stream().map(comment ->
                    commentMapper.convertCommentEntityToCommentRetrievalDto(comment)).collect(Collectors.toList());
            return new ResponseEntity<>(commentRetrievalDtos, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
