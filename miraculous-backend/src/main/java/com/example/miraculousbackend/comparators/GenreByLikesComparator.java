package com.example.miraculousbackend.comparators;


import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Comparator;

public class GenreByLikesComparator implements Comparator<Genre> {

    private GenreService genreService;

    @Autowired
    public void setGenreService(GenreService genreService) {
        this.genreService = genreService;
    }

    @Override
    public int compare(Genre o1, Genre o2) {

        if (genreService.getNumberOfLikesOfGenre(o1.getId()) > genreService.getNumberOfLikesOfGenre(o2.getId())){

            return 1;

        }else if (genreService.getNumberOfLikesOfGenre(o1.getId()) < genreService.getNumberOfLikesOfGenre(o2.getId())){

            return -1;

        }else {

            return 0;
        }
    }
}
