package com.example.miraculousbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistProfileDto {

    private Long id;
    private String login;
    private String dateOfRegistration;
    private List<String> genres;
    private String description;
    private String location;
    private String pictureUrlName;
    private Long totalNumberOfLikes;
    private Boolean areCommentsAllowed;
}
