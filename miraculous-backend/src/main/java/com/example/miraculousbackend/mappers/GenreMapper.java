package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.GenreDto;
import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.repositories.GenreRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class GenreMapper {

    private GenreRepository genreRepository;

    @Autowired
    public void setGenreRepository(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public GenreDto convertGenreEntityToGenreDtoWithNumberOfLikes(Genre genre, long totalNumberOfLikes){

        GenreDto genreDto = new GenreDto();
        genreDto.setId(genre.getId());
        genreDto.setTitle(genre.getTitle());
        genreDto.setGenrePictureUrlName(genre.getGenrePictureUrl().getImageUrl());
        genreDto.setTotalNumberOfLikes(totalNumberOfLikes);
        genreDto.setDescription(genre.getDescription());
        return genreDto;
    }

    public GenreDto convertGenreEntityToGenreDtoWithoutLikes(Genre genre){

        GenreDto genreDto = new GenreDto();
        genreDto.setId(genre.getId());
        genreDto.setTitle(genre.getTitle());
        genreDto.setGenrePictureUrlName(genre.getGenrePictureUrl().getImageUrl());
        genreDto.setDescription(genre.getDescription());
        return genreDto;
    }

    public Genre convertGenreDtoToGenreEntity(GenreDto genreDto){

        Genre genre = genreRepository.findById(genreDto.getId()).get();
        return genre;
    }
}


