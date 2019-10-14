package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.CommentDispatchDto;
import com.example.miraculousbackend.dto.CommentRetrievalDto;
import com.example.miraculousbackend.entities.Artist;
import com.example.miraculousbackend.entities.Comment;
import com.example.miraculousbackend.entities.User;
import com.example.miraculousbackend.repositories.CommentRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class CommentMapper {

    private SiteVisitorRepository siteVisitorRepository;
    private CommentRepository commentRepository;

    @Autowired
    public void setCommentRepository(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    public Comment convertCommentDispatchDtoToCommentEntity(CommentDispatchDto commentDispatchDto){

        LocalDateTime localDateTime = LocalDateTime.now();
        Comment comment = new Comment();
        comment.setText(commentDispatchDto.getText());
        comment.setDateOfComment(localDateTime);
        comment.setAuthor((siteVisitorRepository.findById(commentDispatchDto.getAuthorId())).get());
        return comment;
    }

    public CommentRetrievalDto convertCommentEntityToCommentRetrievalDto(Comment comment){

        ArrayList<String> listOfCommentAuthorRoles = (ArrayList<String>)comment.getAuthor().getRoles().stream()
                .map(role -> role.getTitle()).collect(Collectors.toList());

        CommentRetrievalDto commentRetrievalDto = new CommentRetrievalDto();
        commentRetrievalDto.setId(comment.getId());
        commentRetrievalDto.setAuthorId(comment.getAuthor().getId());
        commentRetrievalDto.setAuthorLogin(comment.getAuthor().getLogin());
        commentRetrievalDto.setDateOfComment(comment.getDateOfComment().toString());
        commentRetrievalDto.setText(comment.getText());
        if (listOfCommentAuthorRoles.contains("ROLE_ADMIN")){
            commentRetrievalDto.setRole("admin");
        }else if (listOfCommentAuthorRoles.contains("ROLE_ARTIST")){
            commentRetrievalDto.setRole("artist");
        }else {
            commentRetrievalDto.setRole("user");
        }
        if (commentRetrievalDto.getRole().equals("artist")){

            if (((Artist)comment.getAuthor()).getPicture() == null){

                commentRetrievalDto.setCommentAuthorPictureUrlName(null);

            }else {
                commentRetrievalDto.setCommentAuthorPictureUrlName(((Artist)comment.getAuthor()).getPicture().getImageUrl());
            }

        }else if (commentRetrievalDto.getRole().equals("user")){

            if (((User)comment.getAuthor()).getPicture() == null){
                commentRetrievalDto.setCommentAuthorPictureUrlName(null);
            }else {
                commentRetrievalDto.setCommentAuthorPictureUrlName(((User)comment.getAuthor()).getPicture().getImageUrl());
            }
        }

        return commentRetrievalDto;
    }
}
