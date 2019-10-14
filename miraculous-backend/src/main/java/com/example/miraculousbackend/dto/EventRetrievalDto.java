package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventRetrievalDto {

    private long id;
    private String eventTitle;
    private String eventLocation;
    private String eventTime;
    private String eventText;
    private String eventCoverPictureUrlName;
    private long artistId;

}
