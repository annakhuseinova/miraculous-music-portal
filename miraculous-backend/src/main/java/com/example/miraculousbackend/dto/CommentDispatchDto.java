package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDispatchDto {

    private long authorId;
    private String text;
    private long artistId;
    private long albumId;
    private long trackId;

}
