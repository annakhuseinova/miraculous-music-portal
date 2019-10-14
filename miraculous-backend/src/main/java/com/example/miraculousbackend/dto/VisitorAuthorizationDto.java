package com.example.miraculousbackend.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitorAuthorizationDto {


    @NotBlank(message = "You must enter your login to sign in.")
    private String login;
    @NotBlank(message = "You must enter your password to sign in.")
    private String password;
}
