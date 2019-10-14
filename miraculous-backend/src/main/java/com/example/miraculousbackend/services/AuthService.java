package com.example.miraculousbackend.services;

import com.example.miraculousbackend.authorization.JwtProvider;
import com.example.miraculousbackend.dto.JwtResponseDto;
import com.example.miraculousbackend.dto.VisitorAuthorizationDto;
import com.example.miraculousbackend.entities.Artist;
import com.example.miraculousbackend.entities.User;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private SiteVisitorRepository siteVisitorRepository;
    private AuthenticationManager authenticationManager;
    private JwtProvider jwtProvider;
    @Value("${music.portal.app.jwtExpiration}")
    private Long jwtExpiration;

    @Autowired
    public void setJwtProvider(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {

        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Transactional
    public ResponseEntity<?> authenticateVisitor(VisitorAuthorizationDto visitorAuthorizationDto){


        if (!siteVisitorRepository.existsByLogin(visitorAuthorizationDto.getLogin())){

            return new ResponseEntity<>(new ResponseMessage("Such user does not exist"), HttpStatus.NOT_FOUND);
        }


        if (!(siteVisitorRepository.findByLogin(visitorAuthorizationDto.getLogin()).get()).getIsActivated()){

            return new ResponseEntity<>(new ResponseMessage("Please, activate your account via email "), HttpStatus.NOT_ACCEPTABLE);
        }

        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(visitorAuthorizationDto.getLogin(), visitorAuthorizationDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String pictureUrl;
        String role;
        if (siteVisitorRepository.findByLogin(userDetails.getUsername()).get().getRoles().get(0).getTitle().equals("ROLE_USER") ){

            role = "user";

            if (((User)siteVisitorRepository.findByLogin(userDetails.getUsername()).get()).getPicture() != null){

                pictureUrl = ((User)siteVisitorRepository.findByLogin(userDetails.getUsername()).get()).getPicture().getImageUrl();

            }else {
                pictureUrl = null;
            }

        }else if (siteVisitorRepository.findByLogin(userDetails.getUsername()).get().getRoles().get(0).getTitle().equals("ROLE_ARTIST")){

            role = "artist";

            if (((Artist)siteVisitorRepository.findByLogin(userDetails.getUsername()).get()).getPicture() != null){

                pictureUrl = ((Artist)siteVisitorRepository.findByLogin(userDetails.getUsername()).get()).getPicture().getImageUrl();

            }else {

                pictureUrl = null;
            }

        }else {

            pictureUrl = null;
            role = "admin";
        }

        return ResponseEntity.ok(new JwtResponseDto(jwt,  siteVisitorRepository.findByLogin(userDetails.getUsername()).get().getId(),
                userDetails.getUsername(), pictureUrl,  role, System.currentTimeMillis() + jwtExpiration* 1000));
    }
}
