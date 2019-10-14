package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "genres")
@Getter
@Setter
@RequiredArgsConstructor
public class Genre {

    @Id
    @SequenceGenerator(name = "genre_id_seq_generator", allocationSize = 1, initialValue = 1, sequenceName = "genre_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "genre_id_seq_generator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "image_id")
    private Image genrePictureUrl;

    @ManyToMany(mappedBy = "genres", fetch = FetchType.LAZY)
    private List<Track> tracks;

    @ManyToMany(mappedBy = "genres", fetch = FetchType.LAZY)
    private List<Album> albums;

}
