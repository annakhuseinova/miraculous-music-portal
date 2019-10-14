package com.example.miraculousbackend.services;

import com.example.miraculousbackend.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {

    private CommentRepository commentRepository;

    @Autowired
    public void setCommentRepository(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Transactional
    public ResponseEntity<?> deleteCommentByCommentId(long commentId){

        if (commentRepository.findById(commentId).isPresent()){

            commentRepository.deleteById(commentId);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
