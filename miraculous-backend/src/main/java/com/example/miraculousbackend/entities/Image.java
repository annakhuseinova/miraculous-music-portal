package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "images")
@Getter
@Setter
@RequiredArgsConstructor
public class Image {

    @Id
    @SequenceGenerator(name = "image_id_seq_generator", sequenceName = "image_id_seq", allocationSize = 1, initialValue = 233)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "image_id_seq_generator")
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

}
