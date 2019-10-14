package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.mappers.TrackMapper;
import com.example.miraculousbackend.repositories.GenreRepository;
import com.example.miraculousbackend.services.GenreService;
import com.example.miraculousbackend.services.TrackService;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/tracks")
@CrossOrigin
public class TrackController {

    TrackService trackService;
    TrackMapper trackMapper;
    GenreRepository genreRepository;
    private GenreService genreService;
    private HashMap<String, String> trackUploadValidationErrors;

    @Autowired
    public void setGenreService(GenreService genreService) {
        this.genreService = genreService;
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
    public void setTrackService(TrackService trackService) {
        this.trackService = trackService;
    }

    @PutMapping("/likes")
    public ResponseEntity<?> putOrRemoveLikeOfTrack(@RequestBody TrackLikeDto trackLikeDto){

        return trackService.putOrRemoveLikeFromTrack(trackLikeDto);
    }

    @GetMapping("/top-10/genres/{genreId}")
    public ResponseEntity<?> getTop10TracksOfGenre(@PathVariable("genreId") long genreId,
                                                   @RequestParam(value = "visitorId", required = false) long visitorId){

        return genreService.getBest10TracksOfGenre(genreId, visitorId);
    }

    @GetMapping("/top-10/free")
    public List<PlayableTrackDto> getTop10FreeTracks(@RequestParam("visitorId") long visitorId){

        return trackService.getTop10FreeTracks(visitorId);
    }

    @PostMapping
    @Secured("ROLE_ARTIST")
    public ResponseEntity<?> uploadTrack(@RequestPart("trackUploadDto") @Valid TrackUploadDto trackUploadDto,
                                         BindingResult bindingResult,
                                         @RequestPart(value = "trackFullVersionFile", required = false) MultipartFile trackFullVersionFile,
                                         @RequestPart(value = "trackPreviewVersionFile", required =  false) MultipartFile trackPreviewVersionFile,
                                         @RequestPart(value = "trackCoverPictureFile", required = false) MultipartFile trackCoverPictureFile,
                                         @RequestPart(value = "trackGenres", required = false) List<GenreDto> trackGenres){

        if (trackFullVersionFile == null){

            return new ResponseEntity<>(new ResponseMessage("You must provide full version of the track"), HttpStatus.NOT_ACCEPTABLE);
        }

        if (trackGenres.isEmpty() || trackGenres == null){

            return new ResponseEntity<>(new ResponseMessage("You must provide at least 1 genre of track"), HttpStatus.NOT_ACCEPTABLE);
        }

        if (bindingResult.hasErrors()){

            trackUploadValidationErrors = new HashMap<>();
            for (FieldError fieldError: bindingResult.getFieldErrors()){

                trackUploadValidationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(trackUploadValidationErrors, HttpStatus.BAD_REQUEST);
        }

        if (!trackUploadDto.getIsFree() && trackPreviewVersionFile == null){

            return new ResponseEntity<>(new ResponseMessage("You must provide track preview version"), HttpStatus.NOT_ACCEPTABLE);
        }

       return trackService.uploadTrack(trackUploadDto, trackFullVersionFile, trackPreviewVersionFile, trackCoverPictureFile, trackGenres, null);
    }

    @GetMapping("/{trackId}")
    public ResponseEntity<?> getTrackFullInfo(@PathVariable("trackId") long trackId, @RequestParam(value = "visitorId",
            required = false) long visitorId){

        return trackService.getFullTrackInfo(trackId, visitorId);
    }

    @GetMapping("/{trackId}/similar-tracks")
    public List<TrackLinkDto> getSimilarTracks(@PathVariable("trackId") long id){

        return trackService.getSimilarTracks(id);
    }

    @GetMapping("/top-15")
    public List<PlayableTrackDto> getTop15TracksByLikes(@RequestParam(value = "visitorId", required = false) long visitorId){

        return trackService.getTop15TracksByLikes(visitorId);

    }

    @GetMapping("/{trackId}/comments")
    public ResponseEntity<?> getTrackComments(@PathVariable("trackId") long trackId){

        return trackService.getTrackComments(trackId);
    }

    @GetMapping("/number")
    public long getNumberOfUploadedTracks(){

        return trackService.getNumberOfUploadedTracks();
    }

    @PostMapping("/comments")
    public ResponseEntity<?> addCommentToTrack(@RequestBody CommentDispatchDto commentDispatchDto){

        return trackService.saveTrackComment(commentDispatchDto);
    }

}
