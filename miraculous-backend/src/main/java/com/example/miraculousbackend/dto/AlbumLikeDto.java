package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumLikeDto {

    private long siteVisitorId;
    private long albumId;
    private long numberOfLikes;
    private boolean isAlbumLikedByCurrentVisitor;
}
