package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@CrossOrigin
public class CommentController {

    private CommentService commentService;

    @Autowired
    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }


    @DeleteMapping("/{commentId}")
    @Secured({"ROLE_ARTIST", "ROLE_USER","ROLE_ADMIN"})
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") long commentId){

        return commentService.deleteCommentByCommentId(commentId);
    }

}
