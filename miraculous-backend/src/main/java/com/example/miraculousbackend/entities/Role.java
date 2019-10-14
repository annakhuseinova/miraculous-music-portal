package com.example.miraculousbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @SequenceGenerator(name = "role_id_seq_generator", sequenceName = "role_id_seq", allocationSize = 1, initialValue = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_seq_generator")
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;
}
