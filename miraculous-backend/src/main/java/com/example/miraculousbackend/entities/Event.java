package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "events")
@Getter
@Setter
@RequiredArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_id_seq_generator")
    @SequenceGenerator(name = "event_id_seq_generator",  allocationSize = 1, initialValue = 1, sequenceName = "event_id_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @Column(name = "event_time")
    private String eventTime;

    @Column(name = "event_title")
    private String eventTitle;

    @Column(name = "event_location")
    private String eventLocation;

    @Column(name = "event_text")
    private String eventText;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image coverImage;



}
