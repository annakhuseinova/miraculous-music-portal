package com.example.miraculousbackend.entities;


import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "carts")
@RequiredArgsConstructor
@Getter
@Setter
public class Cart {

    @Id
    @SequenceGenerator(name = "cart_id_seq_generator", sequenceName = "cart_id_seq",allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cart_id_seq_generator")
    private Long id;

    @OneToOne(optional = false, mappedBy = "cart", fetch = FetchType.LAZY)
    private SiteVisitor cartOwner;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "cart_album",
    joinColumns = @JoinColumn(name = "cart_id"),
    inverseJoinColumns = @JoinColumn(name = "album_id"))
    private List<Album> listOfAlbums;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "cart_track",
    joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "track_id"))
    private List<Track> listOfTracks;
}
