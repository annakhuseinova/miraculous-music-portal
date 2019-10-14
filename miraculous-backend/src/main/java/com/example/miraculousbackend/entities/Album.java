package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "albums")
@RequiredArgsConstructor
@Getter
@Setter
public class Album {

    @Id
    @SequenceGenerator(name = "album_id_seq_generator", sequenceName = "album_id_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "album_id_seq_generator")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private SiteVisitor artist;

    @Column(name = "dateOfRelease")
    private String dateOfRelease;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image coverPicture;

    @Column(name = "size")
    private Double size;

    @Column(name = "price")
    private Double price;

    @ManyToMany
    @JoinTable(name = "album_genre",
    joinColumns = @JoinColumn(name = "album_id"),
    inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres;

    @Column(name = "is_featured")
    private Boolean isFeatured;

    @OneToMany(mappedBy = "album", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Track> tracks;

    @Column(name = "is_free")
    private Boolean isFree;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "album_site_visitor",
    joinColumns = @JoinColumn(name = "album_id"),
    inverseJoinColumns = @JoinColumn(name = "site_visitor_id"))
    private List<SiteVisitor> visitorsWhoLikedThisAlbum;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "album_comment",
            joinColumns = @JoinColumn(name = "album_id"),
            inverseJoinColumns = @JoinColumn(name = "comment_id")
    )
    private List<Comment> comments;

    @Column(name = "length")
    private Double length;

    @Column(name = "description")
    private String description;

}
