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
public class UserSettingsDto {

    private Long id;
    @NotBlank(message = "You must provide an email")
    @Email(message = "You must enter a valid email")
    private String email;
    private String description;
    private String location;
    @Size(min = 6, message = "Your password must have at least 6 symbols")
    private String password;
    @Size(message = "Confirmation password must have at least 6 symbols", min = 6)
    private String confirmationPassword;
    private String coverPictureUrlName;

}
