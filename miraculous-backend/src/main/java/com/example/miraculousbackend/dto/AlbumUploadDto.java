package com.example.miraculousbackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlbumUploadDto {

    @NotBlank(message = "Album must have a title")
    private String title;
    private Long artistId;
    private String description;
    @NotBlank(message = "Album must have a date of release")
    private String dateOfRelease;
    @NotNull(message = "Album must be either free or paid")
    private Boolean isFree;
    @Min((long)0.5)
    @NotNull(message = "Album must have a price of at least 0.5$")
    private Double price;
    @NotNull(message = "Album must have some size")
    private Double size;
    @NotNull(message = "Album must be of some duration")
    private Double duration;
    @Min(value = 1, message = "Album must contain at least 1 track")
    @Max(value = 20, message = "Album cannot have more than 20 tracks")
    private Integer numberOfTracks;

}
