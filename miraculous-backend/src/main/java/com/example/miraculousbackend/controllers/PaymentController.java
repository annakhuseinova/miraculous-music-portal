package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.services.StripeClientService;
import com.stripe.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {


    private StripeClientService stripeClientService;

    @Autowired
    public void setStripeClientService(StripeClientService stripeClientService) {
        this.stripeClientService = stripeClientService;
    }

    @PostMapping("/charge")
    @Secured({"ROLE_ARTIST", "ROLE_USER","ROLE_ADMIN"})
    public ResponseEntity<?> chargeCard(HttpServletRequest request) throws CardException, APIException,
            AuthenticationException, InvalidRequestException, APIConnectionException {

        String token = request.getHeader("token");
        Double amount = Double.parseDouble(request.getHeader("amount"));
        return new ResponseEntity<>(this.stripeClientService.chargeCreditCart(token,amount), HttpStatus.OK);
    }
}
