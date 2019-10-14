package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.services.ArtistService;
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
@RequestMapping("/artists")
@CrossOrigin
public class ArtistController {

    private ArtistService artistService;
    private HashMap<String, String> artistSettingsValidationErrors;
    private HashMap<String, String> eventValidationErrors;

    @Autowired
    public void setArtistService(ArtistService artistService) {
        this.artistService = artistService;
    }


    @GetMapping("/top-15")
    public List<ArtistLinkDto> getTop15ArtistsByLikes(){

        return artistService.getTop15ArtistsByLikes();
    }

    @DeleteMapping("/{artistId}/images/{imageUrl}")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<?> deleteArtistPhotoByArtistIdAndImageUrl(@PathVariable("artistId") long artistId,@PathVariable("imageUrl")
                                                                    String imageUrl){

        return artistService.deleteArtistPhoto(imageUrl, artistId);
    }

    @PostMapping("/settings")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<?> updateArtistSettings(@RequestPart(value = "image", required = false) MultipartFile multipartFile,
                                                  @RequestPart("artistSettingsDto") @Valid ArtistSettingsDto artistSettingsDto, BindingResult bindingResult,
                                                  @RequestPart(value = "artistGenres", required = false) List<GenreDto> genreDtos){

        if (bindingResult.hasErrors()){

            artistSettingsValidationErrors = new HashMap<>();
            for (FieldError fieldError: bindingResult.getFieldErrors()){

                artistSettingsValidationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(artistSettingsValidationErrors, HttpStatus.BAD_REQUEST);
        }
       return artistService.updateArtistSettings(multipartFile, artistSettingsDto, genreDtos);

    }

    @GetMapping("/{artistId}/events")
    public ResponseEntity<List<EventRetrievalDto>> getArtistEventsByArtistId(@PathVariable("artistId") long artistId){

        return artistService.getArtistEvents(artistId);
    }

    @PostMapping("/events")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<?> addNewArtistEvent(@RequestPart("eventDispatchDto") @Valid EventDispatchDto eventDispatchDto,
                                               BindingResult bindingResult,
                                               @RequestPart(value = "image", required = false) MultipartFile multipartFile){

        if (bindingResult.hasErrors()){

            eventValidationErrors = new HashMap<>();
            for (FieldError fieldError: bindingResult.getFieldErrors()){

                eventValidationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(eventValidationErrors, HttpStatus.BAD_REQUEST);
        }
        return artistService.addNewEvent(eventDispatchDto, multipartFile);
    }

    @GetMapping("/login/{artistLogin}")
    public ResponseEntity<?> getArtistByArtistLogin(@PathVariable("artistLogin") String artistLogin){

        return artistService.getArtistByArtistLogin(artistLogin);
    }

    @GetMapping("/{artistId}/settings")
    public ResponseEntity<?> getArtistSettings(@PathVariable("artistId") long artistId){

            return artistService.getArtistSettings(artistId);
    }

    @DeleteMapping("/{artistId}/featured")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<ResponseMessage> deleteArtistFromFeaturedByArtistId(@PathVariable("artistId") long artistId){

        return artistService.deleteArtistFromFeatured(artistId);
    }

    @PostMapping("/featured")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<ResponseMessage> addArtistToFeatured(@RequestBody ArtistLinkDto artist){

        return artistService.addArtistToFeatured(artist.getId());
    }

    @GetMapping("/{artistId}/tracks/all")
    public ResponseEntity<?> getAllTracksOfArtistByArtistId(@PathVariable("artistId") long artistId, @RequestParam(value = "visitorId",
            required = false) long visitorId){

        return artistService.getAllTracksOfArtistByArtistId(artistId, visitorId);
    }

    @GetMapping("/{artistId}/albums/all")
    public ResponseEntity<?> getAllAlbumsOfArtistByArtistId(@PathVariable("artistId") long artistId,
                                                            @RequestParam(value = "visitorId", required = false) long visitorId){

       return  artistService.getAllAlbumsOfArtistByArtistId(artistId, visitorId);
    }

    @GetMapping("/login/{artistLogin}/albums/all")
    public ResponseEntity<?> getAllAlbumsOfArtistByArtistLogin(@PathVariable("artistLogin") String login, @RequestParam(value = "visitorId", required = false) Long visitorId){

        return artistService.getAllAlbumsOfArtistByArtistLogin(login, visitorId);
    }

    @GetMapping("/{artistId}")
    public ResponseEntity<?> getArtistProfileInfo(@PathVariable("artistId") long artistId)  {


        return artistService.getArtistProfileInfoById(artistId, artistService.getTotalNumberOfArtistLikes(artistId));
    }

    @DeleteMapping("/{artistId}")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<?> deleteArtistById(@PathVariable("artistId") long artistId){

        return artistService.deleteArtistById(artistId);

    }

    @GetMapping("/{artistId}/comments")
    public ResponseEntity<?> getArtistComments(@PathVariable("artistId") long artistId){

        return artistService.getArtistComments(artistId);
    }

    @GetMapping("/featured")
    public List<ArtistLinkDto> getFeaturedArtists(){

        return artistService.getFeaturedArtists();
    }


    @GetMapping("/number")
    public long getNumberOfRegisteredArtists(){

        return artistService.getNumberOfRegisteredArtists();
    }

    @PostMapping("/comments")
    @Secured({"ROLE_ARTIST", "ROLE_USER","ROLE_ADMIN"})
    public ResponseEntity<?> addCommentToArtist(@RequestBody CommentDispatchDto commentDispatchDto){

       return artistService.saveArtistComment(commentDispatchDto);
    }

}

