package com.example.miraculousbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistLinkDto {

    private Long id;
    private String login;
    private String pictureUrlName;
    private List<String> genres;
    private Long totalNumberOfLikes;
    private long numberOfTracks;
    private long numberOfAlbums;

}
