package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class Artist extends SiteVisitor{

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "picture_id")
    private Image picture;

    @Column(name = "is_activated")
    private Boolean isActivated;

    @Column(name = "comments_allowed")
    private Boolean commentsAllowed;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "artist_comment",
    joinColumns = @JoinColumn(name = "artist_id"),
    inverseJoinColumns = @JoinColumn(name = "comment_id"))
    private List<Comment> comments;

    @OneToMany(mappedBy = "artist", fetch = FetchType.LAZY)
    private List<Track> listOfTracks;

    @OneToMany(mappedBy = "artist", fetch = FetchType.LAZY)
    private List<Album> listOfAlbums;

    @OneToMany(mappedBy = "artist", fetch = FetchType.LAZY)
    private List<Event> events;


}
