package com.example.miraculousbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {

    private String accessToken;
    private Long visitorId;
    private String login;
    private String pictureUrlName;
    private String role;
    private long jwtExpirationTime;

}
