package com.example.miraculousbackend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GenreDto {

    private Long id;
    private String title;
    private String genrePictureUrlName;
    private Long totalNumberOfLikes;
    private String description;
}
