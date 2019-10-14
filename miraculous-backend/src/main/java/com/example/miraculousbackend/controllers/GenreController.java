package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.GenreDto;
import com.example.miraculousbackend.services.ArtistService;
import com.example.miraculousbackend.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/genres")
@CrossOrigin
public class GenreController {

    private GenreService genreService;
    private ArtistService artistService;

    @Autowired
    public void setArtistService(ArtistService artistService) {
        this.artistService = artistService;
    }

    @Autowired
    public void setGenreService(GenreService genreService) {
        this.genreService = genreService;
    }


    @GetMapping("/{genreId}/10-artists")
    public ResponseEntity<?> get10ArtistsOfGenre(@PathVariable("genreId") long genreId){

        return artistService.get10ArtistsOfGenreByGenreId(genreId);

    }

    @GetMapping("/{genreId}")
    public ResponseEntity<?> getGenreById(@PathVariable("genreId") long genreId){

        return genreService.getGenreById(genreId);
    }

    @GetMapping
    public List<GenreDto> getExistingGenresInOrderOfPopularity(){

        return genreService.getAllGenres();
    }

}
