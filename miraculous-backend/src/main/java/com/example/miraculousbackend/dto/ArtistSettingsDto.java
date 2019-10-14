package com.example.miraculousbackend.dto;

import com.example.miraculousbackend.validation.FieldMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldMatch(message = "Passwords do not match", firstField = "password", secondField = "confirmationPassword")
public class ArtistSettingsDto {

    private Long id;
    @NotBlank(message = "You must enter an email")
    @Email(message = "You must enter a valid email")
    private String email;
    @Size(min = 6, message = "Password must have at least 6 symbols")
    private String password;
    @Size(min = 6, message = "Password confirmation must have at least 6 symbols")
    private String confirmationPassword;
    private String description;
    private String location;
    @NotNull(message = "You must either allow or disallow comments on your page")
    private Boolean areCommentsAllowed;
    private String pictureUrlName;

}
