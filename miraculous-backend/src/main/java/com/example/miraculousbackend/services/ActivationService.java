package com.example.miraculousbackend.services;

import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.net.URI;
import java.net.URISyntaxException;

@Service
public class ActivationService {

    private SiteVisitorService siteVisitorService;
    @Value("${music.portal.client.redirect.link}")
    private String clientRedirectLink;

    @Autowired
    public void setSiteVisitorService(SiteVisitorService siteVisitorService) {
        this.siteVisitorService = siteVisitorService;
    }

    @Transactional
    public ResponseEntity<?> activateAccount(String activationCode){

        HttpHeaders httpHeaders = new HttpHeaders();
        try {
            httpHeaders.setLocation(new URI(clientRedirectLink));
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        if (!siteVisitorService.checkIfExistsByActivationCode(activationCode)){

            return new ResponseEntity<>(new ResponseMessage("Account does not exist"), httpHeaders, HttpStatus.PERMANENT_REDIRECT);
        }
        boolean isActivated = siteVisitorService.activate(activationCode);

        if (isActivated) {

            return new ResponseEntity<>(new ResponseMessage("Account successfully activated"), httpHeaders, HttpStatus.PERMANENT_REDIRECT);

        }else {

            return new ResponseEntity<>(new ResponseMessage("Account already activated. Please, log in"),httpHeaders, HttpStatus.PERMANENT_REDIRECT);
        }
    }
}
