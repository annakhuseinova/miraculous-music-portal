package com.example.miraculousbackend.dto;


import com.example.miraculousbackend.validation.FieldMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldMatch(message = "Passwords do not match", firstField = "password", secondField = "confirmationPassword")
public class VisitorRegistrationDto {

    @NotBlank(message = "You must enter your login")
    private String login;
    @NotBlank(message = "You must enter your password")
    @Size(min = 6, message = "Your password must have at least 6 symbols")
    private String password;
    @NotBlank(message = "You must enter confirmation password")
    @Size(min = 6, message = "Confirmation password must have at least 6 symbols")
    private String confirmationPassword;
    @Email(message = "You must enter a valid email")
    @NotBlank(message = "You must provide an email")
    private String email;
    private String description;
    private String location;
    @NotBlank(message = "You must choose whether you're an artist or a user.")
    private String role;

}
