package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.services.AlbumService;
import com.example.miraculousbackend.services.GenreService;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import javax.persistence.EntityNotFoundException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.*;

@RestController
@RequestMapping("/albums")
@CrossOrigin
@Validated
public class AlbumController {

    private AlbumService albumService;
    private GenreService genreService;

    @Autowired
    public void setGenreService(GenreService genreService) {
        this.genreService = genreService;
    }


    @Autowired
    public void setAlbumService(AlbumService albumService) {
        this.albumService = albumService;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValid(MethodArgumentNotValidException exception){

        Map<String, String> body = new LinkedHashMap<>();
        for (FieldError fieldError: exception.getBindingResult().getFieldErrors()){
            body.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        body.put("typeOfErrorResponse", "MethodArgumentNotValid");
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException exception){

        Map<String, String> body = new LinkedHashMap<>();
        for (ConstraintViolation violation: exception.getConstraintViolations()){
            for (Path.Node node: violation.getPropertyPath()){
                body.put(node.getName(), violation.getMessage());
            }
        }
        body.put("typeOfErrorResponse", "ConstraintViolation");
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMultipartException(MaxUploadSizeExceededException exception){

        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    @Secured("ROLE_ARTIST")
    public ResponseEntity<?> uploadAlbum(@RequestPart("albumUploadDto") @Valid AlbumUploadDto albumUploadDto,
                                         @RequestPart("listOfFullVersions")@NotEmpty(message = "You need to choose at least one full version track")
                                                 List<MultipartFile> fullVersions,
                                         @RequestPart(value = "listOfPreviewVersions", required = false) List<MultipartFile> previewVersions,
                                         @RequestPart(value = "coverPictureFile", required = false) MultipartFile coverPictureFile,
                                         @RequestPart("genres") @NotEmpty(message = "Album must be of at least one genre ") List<GenreDto> albumGenres,
                                         @RequestPart("albumTrackUploadDtos")@NotEmpty(message = "Album must have at least one track")
                                                     List<@Valid AlbumTrackUploadDto> albumTrackUploadDtos){

        return albumService.uploadAlbum(albumUploadDto, fullVersions, previewVersions, coverPictureFile, albumGenres, albumTrackUploadDtos);
    }

    @GetMapping("/top-15")
    public List<AlbumLinkDto> getTop15AlbumsByLikes(@RequestParam(value = "visitorId", required = false) long visitorId){

        return albumService.getTop15AlbumsByLikes(visitorId);
    }

    @GetMapping("/top-10/genres/{genreId}")
    public ResponseEntity<?> getTop10AlbumsOfGenre(@PathVariable("genreId") long genreId, @RequestParam(value = "visitorId", required = false) long visitorId){

        return genreService.getBest10AlbumsOfGenre(genreId, visitorId);
    }

    @PutMapping("/likes")
    @Secured({"ROLE_ADMIN","ROLE_USER", "ROLE_ARTIST"})
    public ResponseEntity<?> putOrRemoveLikeFromAlbum(@RequestBody AlbumLikeDto albumLikeDto ){

        return albumService.putOrRemoveLikeFromAlbum(albumLikeDto);
    }

    @GetMapping("/top-10/free")
    public List<AlbumLinkDto> getTop10FreeAlbums(@RequestParam(value = "visitorId", required = false) long visitorId){

       return albumService.getTop10FreeAlbums(visitorId);

    }

    @DeleteMapping("/{albumId}/featured")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<ResponseMessage> deleteAlbumFromFeaturedByAlbumId(@PathVariable("albumId") long albumId){

        return albumService.deleteAlbumFromFeaturedByAlbumId(albumId);
    }

    @GetMapping("/{albumId}/tracks")
    public ResponseEntity<?> getTracksOfAlbumByAlbumId(@PathVariable("albumId") long albumId, @RequestParam(value = "visitorId", required = false) long visitorId){

        return albumService.getTracksOfAlbumByAlbumId(albumId, visitorId);
    }

    @GetMapping("/{albumId}")
    public ResponseEntity<?> getFullAlbumInfo(@PathVariable("albumId") long albumId, @RequestParam(value = "visitorId", required = false) long visitorId){

        return albumService.getFullAlbumInfo(albumId, visitorId);
    }

    @GetMapping("/featured")
    public List<AlbumLinkDto> getFeaturedAlbums(@RequestParam(value = "visitorId", required = false) long visitorId){

        return albumService.getFeaturedAlbums(visitorId);
    }

    @GetMapping("/{albumId}/similar-albums")
    public List<AlbumLinkDto> getSimilarAlbumsByAlbumId(@PathVariable("albumId") long albumId, @RequestParam(value = "visitorId", required = false) long visitorId){

        return albumService.getSimilarAlbums(albumId, visitorId);
    }

    @GetMapping("/{albumId}/comments")
    public List getAlbumComments(@PathVariable("albumId") long albumId){

        return albumService.getAlbumComments(albumId);
    }

    @GetMapping("/number")
    public long getNumberOfRegisteredAlbums(){

        return albumService.getNumberOfUploadedAlbums();
    }

    @PutMapping("/featured")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<ResponseMessage> addAlbumToFeatured(@RequestBody long albumId){

        return albumService.addAlbumToFeatured(albumId);
    }

    @PostMapping("/comments")
    @Secured({"ROLE_ARTIST", "ROLE_USER","ROLE_ADMIN"})
    public ResponseEntity<?> addCommentToAlbum(@RequestBody CommentDispatchDto commentDispatchDto){

        return albumService.addCommentToAlbum(commentDispatchDto);
    }



}
