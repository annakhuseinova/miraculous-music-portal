package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackLikeDto {

    private Long siteVisitorId;
    private Long trackId;
    private long numberOfLikes;
    private boolean isTrackLikedByCurrentVisitor;
}
