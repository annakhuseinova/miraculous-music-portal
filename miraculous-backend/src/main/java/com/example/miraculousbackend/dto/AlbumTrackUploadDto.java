package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlbumTrackUploadDto {


    private Long artistId;
    @NotBlank(message = "Each album track must have a title")
    private String title;
    @NotNull(message = "Each album track must have a price")
    private Double price;
    private Double fullAlbumTrackVersionSize;
    private Double previewAlbumTrackVersionSize;
    private Double duration;
    @NotNull(message = "Album track must be either free or paid")
    private Boolean isFree;
}
