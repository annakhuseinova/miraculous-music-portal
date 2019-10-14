package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.entities.Genre;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GenreToStringAndReverseConverter {


    public static List<String> convertGenreObjectsToStrings(List<Genre> genres){

        ArrayList<String> listOfGenresAsStrings;
        listOfGenresAsStrings = (ArrayList<String>) genres.stream().map(genre -> genre.getTitle())
                .collect(Collectors.toList());
        return listOfGenresAsStrings;
    }

}
