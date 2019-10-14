package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {

    private Long id;
    private String login;
    private String email;
    private String dateOfRegistration;
    private List<String> favouriteGenres;
    private String description;
    private String location;
    private String pictureUrlName;
    private Boolean isLikedMusicShown;

}
