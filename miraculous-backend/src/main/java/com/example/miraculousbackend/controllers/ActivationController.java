package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.services.ActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.validation.ConstraintDeclarationException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/activate")
@CrossOrigin
public class ActivationController {

    private ActivationService activationService;

    @Autowired
    public void setActivationService(ActivationService activationService) {
        this.activationService = activationService;
    }

    @ExceptionHandler(ConstraintDeclarationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException exception){

        List<String> errorMessages = new ArrayList<>();
        for (ConstraintViolation violation: exception.getConstraintViolations()){

            errorMessages.add(violation.getMessage());
        }
        return new ResponseEntity<>(errorMessages, HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<?> activateAccount(@RequestParam("activationCode") String activationCode){

      return activationService.activateAccount(activationCode);
    }
}
