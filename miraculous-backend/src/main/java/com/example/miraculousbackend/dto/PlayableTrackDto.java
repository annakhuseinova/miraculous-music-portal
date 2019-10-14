package com.example.miraculousbackend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayableTrackDto {

    private Long id;
    private String title;
    private Long artistId;
    private String artistLogin;
    private Long albumId;
    private String albumTitle;
    private Double duration;
    private Long numberOfLikes;
    private String coverPictureUrlName;
    private String audioUrlName;
    private Boolean isFree;
    private Double price;
    private List<String> genres;
    private String dateOfRelease;
    private boolean isLikedByCurrentVisitor;
    private boolean isInCartOfCurrentVisitor;

}
