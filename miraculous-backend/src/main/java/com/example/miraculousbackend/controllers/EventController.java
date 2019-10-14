package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/events")
@CrossOrigin
public class EventController {

    private EventService eventService;

    @Autowired
    public void setEventService(EventService eventService) {
        this.eventService = eventService;
    }

    @DeleteMapping("/{eventId}")
    @Secured("ROLE_EVENT")
    public ResponseEntity<?> deleteEvent(@PathVariable("eventId") long eventId){

        return eventService.deleteEvent(eventId);
    }
}
