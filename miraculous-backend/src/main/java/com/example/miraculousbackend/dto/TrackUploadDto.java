package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrackUploadDto {

    @NotBlank(message = "You must provide title of the track")
    private String title;
    private Long artistId;
    private String artistLogin;
    private String description;
    @NotBlank(message = "You must provide date of release")
    private String dateOfRelease;
    @NotNull(message = "Track must be either in paid or free access")
    private Boolean isFree;
    @NotNull(message = "You must give a price for your track")
    private Double price;
    private Double size;
    private Double length;
}
