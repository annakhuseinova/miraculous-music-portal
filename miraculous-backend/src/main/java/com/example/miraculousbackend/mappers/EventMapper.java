package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.EventDispatchDto;
import com.example.miraculousbackend.dto.EventRetrievalDto;
import com.example.miraculousbackend.entities.Event;
import com.example.miraculousbackend.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventMapper {

    private ArtistRepository artistRepository;

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public EventRetrievalDto convertEventEntityToEventRetrievalDto(Event event){

        EventRetrievalDto eventDto = new EventRetrievalDto();
        eventDto.setId(event.getId());
        eventDto.setEventTitle(event.getEventTitle());
        eventDto.setEventLocation(event.getEventLocation());
        eventDto.setEventText(event.getEventText());
        if (event.getCoverImage() != null){

            eventDto.setEventCoverPictureUrlName(event.getCoverImage().getImageUrl());

        }else {
            event.setCoverImage(null);
        }
        eventDto.setEventTime(event.getEventTime());
        eventDto.setArtistId(event.getArtist().getId());
        return  eventDto;
    }

    public Event convertEventDispatchDtoToEventEntity(EventDispatchDto eventDispatchDto){

        Event event = new Event();
        event.setEventTitle(eventDispatchDto.getEventTitle());
        event.setEventText(eventDispatchDto.getEventText());
        event.setEventLocation(eventDispatchDto.getEventLocation());
        event.setEventTime(eventDispatchDto.getEventTime());
        event.setArtist(artistRepository.findById(eventDispatchDto.getArtistId()).get());
        return event;
    }
}
