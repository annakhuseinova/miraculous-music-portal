package com.example.miraculousbackend.services;

import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeClientService {

    @Autowired
    public StripeClientService() {
        Stripe.apiKey = "sk_test_xysrGIZrX17Pisy5eEmroDZa00cw9XDwje";
    }

    public Charge chargeCreditCart(String token, double amount) throws CardException, APIException, AuthenticationException, InvalidRequestException, APIConnectionException {

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int)(amount*100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        Charge charge = Charge.create(chargeParams);
        return charge;
    }
}
