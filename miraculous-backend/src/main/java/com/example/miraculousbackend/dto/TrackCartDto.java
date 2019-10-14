package com.example.miraculousbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrackCartDto {

    private long visitorId;
    private long trackId;
}
