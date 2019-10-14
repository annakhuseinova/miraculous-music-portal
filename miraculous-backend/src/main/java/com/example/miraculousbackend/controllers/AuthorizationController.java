package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.VisitorAuthorizationDto;
import com.example.miraculousbackend.services.AuthService;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.HashMap;

@RequestMapping("/authorization")
@CrossOrigin
@Controller
public class AuthorizationController {

    private AuthService authService;
    private HashMap<String, String> errors;

    @Autowired
    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException exception){
        return new ResponseEntity<>(new ResponseMessage("You've given wrong password"), HttpStatus.UNAUTHORIZED);
    }

    @PostMapping
    public ResponseEntity<?> authenticateVisitor(@RequestBody @Valid VisitorAuthorizationDto visitorAuthorizationDto, BindingResult bindingResult){

        if (bindingResult.hasErrors()){
            errors = new HashMap<>();
            for (FieldError fieldError: bindingResult.getFieldErrors()){

                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        return authService.authenticateVisitor(visitorAuthorizationDto);
    }
}
