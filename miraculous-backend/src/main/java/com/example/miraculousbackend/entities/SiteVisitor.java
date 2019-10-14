package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "site_visitors", schema = "public")
@RequiredArgsConstructor
@Getter
@Setter
public class SiteVisitor {

    @Id
    @SequenceGenerator(name = "site_visitor_id_seq_generator",sequenceName = "site_visitor_id_seq", allocationSize = 1, initialValue = 211)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "site_visitor_id_seq_generator")
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "password")
    private String password;

    @Column(name = "date_of_registration")
    private LocalDate dateOfRegistration;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "site_visitor_role",
    joinColumns = @JoinColumn(name = "site_visitor_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @Column(name = "email")
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "site_visitor_genre",
    joinColumns = @JoinColumn(name = "site_visitor_id"),
    inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "player_queue_id")
    private Playlist playerQueue;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "site_visitor_purchased_track",
    joinColumns = @JoinColumn(name = "site_visitor_id"),
    inverseJoinColumns = @JoinColumn(name = "track_id"))
    private List<Track> purchasedTracks;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "site_visitor_purchased_album",
    joinColumns = @JoinColumn(name = "site_visitor_id"),
    inverseJoinColumns = @JoinColumn(name = "album_id"))
    private List<Album> purchasedAlbums;

    @Column(name = "is_activated")
    private Boolean isActivated;

    @Column(name = "activation_code")
    private String activationCode;

}
