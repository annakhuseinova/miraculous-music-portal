package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDispatchDto {

    private long artistId;
    @NotBlank(message = "Event must have a title")
    private String eventTitle;
    @NotBlank(message = "Event must have a location")
    private String eventLocation;
    @NotBlank(message = "You must indicate date and time")
    private String eventTime;
    private String eventCoverPictureUrlName;
    @NotBlank(message = "Provide some information")
    private String eventText;

}
