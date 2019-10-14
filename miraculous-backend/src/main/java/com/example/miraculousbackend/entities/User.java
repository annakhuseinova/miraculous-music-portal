package com.example.miraculousbackend.entities;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class User extends SiteVisitor {


    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @ManyToOne(optional = true)
    @JoinColumn(name = "picture_id")
    private Image picture;

    @Column(name = "is_activated")
    private Boolean isActivated;

}
