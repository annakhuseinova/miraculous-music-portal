package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tracks")
@RequiredArgsConstructor
@Getter
@Setter
public class Track {

    @Id
    @SequenceGenerator(name = "track_id_seq_generator", sequenceName = "track_id_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "track_id_seq_generator")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private SiteVisitor artist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image coverPicture;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "album_id")
    private Album album;

    @Column(name = "date_of_release")
    private String dateOfRelease;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "track_genre",
    joinColumns = @JoinColumn(name = "track_id"),
    inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres;

    @Column(name = "is_free")
    private Boolean isFree;

    @Column(name = "price")
    private Double price;

    @Column(name = "size")
    private Double size;

    @Column(name = "length")
    private Double length;

    @Column(name = "url_to_track_full_version")
    private String urlToTrackFullVersion;

    @Column(name = "url_to_track_preview_version")
    private String urlToTrackPreviewVersion;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "track_site_visitor",
    joinColumns = @JoinColumn(name = "track_id"),
    inverseJoinColumns = @JoinColumn(name = "site_visitor_id"))
    private List<SiteVisitor> visitorsWhoLikedThisTrack;


    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "track_comment",
    joinColumns = @JoinColumn(name = "track_id"),
    inverseJoinColumns = @JoinColumn(name = "comment_id"))
    private List<Comment> comments;
}
