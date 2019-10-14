package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.entities.*;
import com.example.miraculousbackend.mappers.AlbumMapper;
import com.example.miraculousbackend.mappers.CommentMapper;
import com.example.miraculousbackend.mappers.GenreMapper;
import com.example.miraculousbackend.mappers.TrackMapper;
import com.example.miraculousbackend.repositories.AlbumRepository;
import com.example.miraculousbackend.repositories.CommentRepository;
import com.example.miraculousbackend.repositories.GenreRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.apache.catalina.connector.ClientAbortException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Validated
public class AlbumService {

    private AlbumRepository albumRepository;
    private TrackMapper trackMapper;
    private AlbumMapper albumMapper;
    private GenreRepository genreRepository;
    private CommentRepository commentRepository;
    private SiteVisitorRepository siteVisitorRepository;
    private CommentMapper commentMapper;
    private SiteVisitorService siteVisitorService;
    private GenreMapper genreMapper;
    private FileStorageService fileStorageService;

    @Autowired
    public void setFileStorageService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @Autowired
    public void setGenreMapper(GenreMapper genreMapper) {
        this.genreMapper = genreMapper;
    }

    @Autowired
    public void setSiteVisitorService(SiteVisitorService siteVisitorService) {
        this.siteVisitorService = siteVisitorService;
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
    public void setGenreRepository(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Autowired
    public void setCommentRepository(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Autowired
    public void setAlbumMapper(AlbumMapper albumMapper) {
        this.albumMapper = albumMapper;
    }

    @Autowired
    public void setAlbumRepository(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }


    @Transactional
    public ResponseEntity<?> uploadAlbum(AlbumUploadDto albumUploadDto,
                                         List<MultipartFile> fullVersions,
                                         List<MultipartFile> previewVersions,
                                         MultipartFile coverPictureUrl,
                                         List<GenreDto> albumGenres,
                                         List<AlbumTrackUploadDto> albumUploadTracks){

        try {

            if (siteVisitorRepository.findById(albumUploadDto.getArtistId()).isPresent()){

                List<Genre> genres = albumGenres.stream().map(genreDto -> genreMapper.convertGenreDtoToGenreEntity(genreDto))
                        .collect(Collectors.toList());
                Album album = albumMapper.convertAlbumUploadDtoIntoAlbumEntity(albumUploadDto, genres);
                if (coverPictureUrl != null){
                    album.setCoverPicture(fileStorageService.storeImage(coverPictureUrl));
                }
                Album album1 = albumRepository.save(album);
                List<Track> tracks = albumUploadTracks.stream().map(albumTrackUploadDto ->
                        trackMapper.convertAlbumTrackUploadDtoIntoTrackEntity(albumTrackUploadDto)).collect(Collectors.toList());
                for (int i = 0; i < fullVersions.size(); i++) {
                    tracks.get(i).setDateOfRelease(album1.getDateOfRelease());
                    tracks.get(i).setAlbum(album1);
                    album1.getTracks().add(fileStorageService.storeTrack(fullVersions.get(i), previewVersions.get(i), tracks.get(i), coverPictureUrl, genres));
                }
                albumRepository.save(album1);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {

                return new ResponseEntity<>(new ResponseMessage("Artist not found"), HttpStatus.NOT_FOUND);

            }
        } catch (ClientAbortException exception){

            System.out.println("Клиент разорвал соединение");

        } catch (IOException e) {

            e.printStackTrace();
        }

        return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);

    }

    @Transactional
    public List<AlbumLinkDto> getTop10FreeAlbums(long visitorId){

        Pageable pageable = PageRequest.of(0,10);
        List<Album> albums = albumRepository.getTopFreeAlbums(pageable);

        return albums.stream().map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, visitorId)).collect(Collectors.toList());
    }

    @Transactional
    public ResponseEntity<?> putOrRemoveLikeFromAlbum(AlbumLikeDto albumLikeDto) {

        if (siteVisitorRepository.findById(albumLikeDto.getSiteVisitorId()).isPresent()) {
            if (albumRepository.findById(albumLikeDto.getAlbumId()).isPresent()) {

                SiteVisitor siteVisitor = siteVisitorService.findSiteVisitorById(albumLikeDto.getSiteVisitorId()).get();
                Album album = findAlbumById(albumLikeDto.getAlbumId()).get();
                if (album.getVisitorsWhoLikedThisAlbum().contains(siteVisitor)) {

                    album.getVisitorsWhoLikedThisAlbum().remove(siteVisitor);
                    saveAlbum(album);
                    albumLikeDto.setAlbumLikedByCurrentVisitor(false);
                    albumLikeDto.setNumberOfLikes(getNumberOfAlbumLikes(albumLikeDto.getAlbumId()));
                    return new ResponseEntity<>(albumLikeDto, HttpStatus.OK);

                } else {

                    album.getVisitorsWhoLikedThisAlbum().add(siteVisitor);
                    saveAlbum(album);
                    albumLikeDto.setAlbumLikedByCurrentVisitor(true);
                    albumLikeDto.setNumberOfLikes(getNumberOfAlbumLikes(albumLikeDto.getAlbumId()));
                    return new ResponseEntity<>(albumLikeDto, HttpStatus.OK);
                }

            } else {

                return new ResponseEntity<>(new ResponseMessage("Album not found"), HttpStatus.NOT_FOUND);
            }
        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public long getNumberOfAlbumLikes(long albumId){

        return albumRepository.findById(albumId).get().getVisitorsWhoLikedThisAlbum().size();
    }

    @Transactional
    public Optional<Album> findAlbumById(long albumId){

      if (albumRepository.findById(albumId).isPresent()){

          return albumRepository.findById(albumId);
      }else {

         Optional<Album> album = Optional.empty();
         return album;
      }
    }

    @Transactional
    public Album saveAlbum(Album album){

        return albumRepository.save(album);
    }

    @Transactional
    public ResponseEntity<?> getTracksOfAlbumByAlbumId(long albumId, long visitorId){


        if (albumRepository.findById(albumId).isPresent()){

            List<Track> tracksOfAlbum = albumRepository.findById(albumId).get().getTracks();
            List<PlayableTrackDto> playableTrackDtoList = tracksOfAlbum.stream().map(track ->
                    trackMapper.convertTrackEntityToPlayableTrackDto(track, visitorId))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(playableTrackDtoList, HttpStatus.OK);
        }else {

            return new ResponseEntity<>(new ResponseMessage("Album not found"), HttpStatus.NOT_FOUND);
        }

    }

    @Transactional
    public ResponseEntity<ResponseMessage> deleteAlbumFromFeaturedByAlbumId(long albumId){

        if (albumRepository.findById(albumId).isPresent()){

            Album album = albumRepository.findById(albumId).get();
            album.setIsFeatured(false);
            albumRepository.save(album);
            return new ResponseEntity<>(new ResponseMessage(album.getTitle() + " has been deleted from featured"), HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> addCommentToAlbum(CommentDispatchDto commentDispatchDto){

        if (albumRepository.findById(commentDispatchDto.getAlbumId()).isPresent()){

            Album album = albumRepository.findById(commentDispatchDto.getAlbumId()).get();
            Comment comment = commentMapper.convertCommentDispatchDtoToCommentEntity(commentDispatchDto);
            album.getComments().add(comment);
            albumRepository.save(album);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public void deleteAlbumById(long albumId){
        albumRepository.deleteById(albumId);
    }

    @Transactional
    public long getNumberOfUploadedAlbums(){

        return albumRepository.count();
    }

    @Transactional
    public ResponseEntity<?> getFullAlbumInfo(long albumId, long visitorId){

        if (albumRepository.findById(albumId).isPresent()){

            FullAlbumInfoDto fullAlbumInfoDto = albumMapper.convertAlbumEntityToFullAlbumInfoDto(albumRepository.findById(albumId).get(), visitorId);
            return new ResponseEntity<>(fullAlbumInfoDto, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<ResponseMessage> addAlbumToFeatured(long albumId){

        if (albumRepository.findById(albumId).isPresent()){

            Album album = albumRepository.findById(albumId).get();
            album.setIsFeatured(true);
            System.out.println(albumRepository.save(album).getIsFeatured());
            return new ResponseEntity<>(new ResponseMessage(album.getTitle() + " has been added to featured"), HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public List<AlbumLinkDto> getFeaturedAlbums(long visitorId){

        return albumRepository.findAllByIsFeatured(true).stream().limit(10)
                .map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, visitorId)).collect(Collectors.toList());
    }

    @Transactional
    public List getAlbumComments(long albumId){

        if (albumRepository.findById(albumId).isPresent()){

            List<Comment> comments = albumRepository.findById(albumId).get().getComments();
            List<CommentRetrievalDto> commentRetrievalDtos = comments.stream().map(comment ->
                    commentMapper.convertCommentEntityToCommentRetrievalDto(comment)).collect(Collectors.toList());

            return commentRetrievalDtos;

        }else {

            return Collections.EMPTY_LIST;
        }

    }

    @Transactional
    public List<AlbumLinkDto> getSimilarAlbums(long albumId, long siteVisitorId){

        Pageable pageable = PageRequest.of(0,10);
        if (albumRepository.findById(albumId).isPresent()){
            Genre genre = albumRepository.findById(albumId).get().getGenres().get(0);
            List<Album> similarAlbums = genreRepository.getSimilarAlbumsByAlbumId(genre.getId(), pageable);
            Collections.shuffle(similarAlbums);
            return similarAlbums.stream().map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, siteVisitorId))
                    .collect(Collectors.toList());
        }else {

        }

        throw new EntityNotFoundException("The album does not exist");
    }

    public boolean checkIfAlbumExists(long albumId){

        return albumRepository.existsById(albumId);
    }

    @Transactional
    public List<AlbumLinkDto> getTop15AlbumsByLikes(long visitorId) {

        Pageable pageable = PageRequest.of(0,15);
        List<Album> albums =  albumRepository.getTopAlbums(pageable);
        Collections.shuffle(albums);
        return albums.stream().map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, visitorId)).collect(Collectors.toList());
    }
}

