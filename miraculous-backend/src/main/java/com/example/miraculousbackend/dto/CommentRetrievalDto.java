package com.example.miraculousbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRetrievalDto {

    private Long id;
    private Long authorId;
    private String authorLogin;
    private String dateOfComment;
    private String role;
    private String text;
    private Long numberOfLikes;
    private String commentAuthorPictureUrlName;
}
