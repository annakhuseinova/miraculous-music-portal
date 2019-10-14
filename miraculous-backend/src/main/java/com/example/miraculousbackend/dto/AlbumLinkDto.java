package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumLinkDto {

    private Long id;
    private String title;
    private Long artistId;
    private String artistLogin;
    private Long numberOfTracks;
    private Long numberOfLikes;
    private List<String> genres;
    private String albumCoverPictureUrlName;
    private String dateOfRelease;
    private Boolean isFree;
    private Double price;
    private boolean isLikedByCurrentVisitor;
    private boolean isInCartOfCurrentVisitor;
}
