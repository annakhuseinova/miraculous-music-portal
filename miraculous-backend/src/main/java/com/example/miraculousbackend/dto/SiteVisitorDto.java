package com.example.miraculousbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteVisitorDto {

    private long id;
    private String login;
    private String dateOfRegistration;
}
