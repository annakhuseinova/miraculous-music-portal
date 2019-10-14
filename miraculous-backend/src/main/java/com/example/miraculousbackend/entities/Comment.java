package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@RequiredArgsConstructor
public class Comment {

    @Id
    @SequenceGenerator(name = "comment_id_seq_generator", allocationSize = 1, sequenceName = "comment_id_generator", initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_id_seq_generator")
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "dateOfComment")
    private LocalDateTime dateOfComment;

    @ManyToOne(optional = false)
    @JoinColumn(name = "author_id")
    private SiteVisitor author;

}
