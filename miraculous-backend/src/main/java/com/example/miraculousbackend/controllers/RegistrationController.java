package com.example.miraculousbackend.controllers;
import com.example.miraculousbackend.dto.VisitorRegistrationDto;
import com.example.miraculousbackend.entities.*;
import com.example.miraculousbackend.repositories.ArtistRepository;
import com.example.miraculousbackend.repositories.RoleRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.repositories.UserRepository;
import com.example.miraculousbackend.services.MailSenderService;
import com.example.miraculousbackend.services.RegistrationService;
import com.example.miraculousbackend.services.SiteVisitorService;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/registration")
@CrossOrigin(origins = "*")
public class RegistrationController {

    private RegistrationService registrationService;
    HashMap<String, String> validationErrors;

    @Autowired
    public void setRegistrationService(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<?> registerSiteVisitor(@RequestBody @Valid VisitorRegistrationDto visitorRegistrationDto, BindingResult bindingResult){

        if (bindingResult.hasErrors()){

            validationErrors = new HashMap<>();

            for (FieldError fieldError: bindingResult.getFieldErrors()){

                validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            if (visitorRegistrationDto.getRole().equals("artist")){

                if (visitorRegistrationDto.getDescription() == null || visitorRegistrationDto.getDescription().trim().length() == 0){

                   validationErrors.put("description", "Please, provide some description");
                }
                if (visitorRegistrationDto.getLocation() == null || visitorRegistrationDto.getLocation().trim().length() == 0){

                    validationErrors.put("location", "You must enter your location");
                }
            }

            return new ResponseEntity<>(validationErrors, HttpStatus.BAD_REQUEST);
        }
        return registrationService.registerSiteVisitor(visitorRegistrationDto);
    }
}
