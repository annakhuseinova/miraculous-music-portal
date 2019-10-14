package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullTrackInfoDto {

    private Long id;
    private String title;
    private Long artistId;
    private String artistLogin;
    private Long albumId;
    private String albumTitle;
    private String dateOfRelease;
    private Double duration;
    private List<String> genres;
    private String description;
    private Boolean isFree;
    private Double price;
    private Long numberOfLikes;
    private String audioUrl;
    private String coverPictureUrlName;
    private Double size;
    private boolean isLikedByCurrentVisitor;
    private boolean isInCurrentVisitorCart;
}
