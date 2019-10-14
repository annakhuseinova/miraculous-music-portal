package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "playlists")
@RequiredArgsConstructor
@Getter
@Setter
public class Playlist {

    @Id
    @SequenceGenerator(name = "playlist_id_seq_generator", initialValue = 1, allocationSize = 1, sequenceName = "playlist_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "playlist_id_seq_generator")
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "playlist_track",
    joinColumns = @JoinColumn(name = "playlist_id"),
    inverseJoinColumns = @JoinColumn(name = "track_id"))
    private List<Track> listOfTracks;

    @OneToOne(mappedBy = "playerQueue", fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_owner_id")
    private SiteVisitor playerOwner;
}
