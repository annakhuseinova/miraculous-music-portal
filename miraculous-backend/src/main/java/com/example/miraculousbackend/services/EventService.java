package com.example.miraculousbackend.services;

import com.example.miraculousbackend.entities.Event;
import com.example.miraculousbackend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventService {

    private EventRepository eventRepository;

    @Autowired
    public void setEventRepository(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event saveEvent(Event event){

        return eventRepository.save(event);
    }

    @Transactional
    public ResponseEntity<?> deleteEvent(long eventId){

        if (eventRepository.findById(eventId).isPresent()){

            eventRepository.deleteById(eventId);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
