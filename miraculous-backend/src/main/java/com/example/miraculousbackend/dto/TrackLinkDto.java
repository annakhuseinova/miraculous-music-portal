package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackLinkDto {

    private Long id;
    private String title;
    private Long artistId;
    private String artistLogin;
    private Long albumId;
    private String albumTitle;
    private Double duration;
    private Long numberOfLikes;
    private String coverPictureUrlName;
    private Boolean isFree;
    private List<String> genres;
    private Double price;
    private boolean isLikedByCurrentVisitor;
    private boolean isInCartOfCurrentVisitor;
}
