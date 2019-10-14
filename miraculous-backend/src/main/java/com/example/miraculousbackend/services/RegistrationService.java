package com.example.miraculousbackend.services;
import com.example.miraculousbackend.dto.VisitorRegistrationDto;
import com.example.miraculousbackend.entities.*;
import com.example.miraculousbackend.repositories.ArtistRepository;
import com.example.miraculousbackend.repositories.RoleRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RegistrationService {

    private SiteVisitorRepository siteVisitorRepository;
    private RoleRepository roleRepository;
    private ArtistRepository artistRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private MailSenderService mailSenderService;
    @Value("${music.portal.activation.link}")
    private String musicPortalDomain;

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Autowired
    public void setbCryptPasswordEncoder(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Autowired
    public void setMailSenderService(MailSenderService mailSenderService) {
        this.mailSenderService = mailSenderService;
    }

    @Transactional
    public ResponseEntity<?> registerSiteVisitor(VisitorRegistrationDto visitorRegistrationDto){

        if (siteVisitorRepository.existsByLogin(visitorRegistrationDto.getLogin())){
            return new ResponseEntity<>(new ResponseMessage("Failed to register. This login already exists"),
                    HttpStatus.NOT_ACCEPTABLE);
        }

        if (siteVisitorRepository.existsByEmail(visitorRegistrationDto.getEmail())){

            return new ResponseEntity<>(new ResponseMessage("Failed to register. Email is already in use!"), HttpStatus.NOT_ACCEPTABLE);
        }

        if (visitorRegistrationDto.getRole().equals("artist")){

            Artist artist = new Artist();
            List<Role> roles = new ArrayList<>();
            roles.add(roleRepository.findByTitle("ROLE_ARTIST").get());
            artist.setLogin(visitorRegistrationDto.getLogin());
            artist.setPassword(bCryptPasswordEncoder.encode(visitorRegistrationDto.getPassword()));
            artist.setEmail(visitorRegistrationDto.getEmail());
            artist.setDescription(visitorRegistrationDto.getDescription());
            artist.setLocation(visitorRegistrationDto.getLocation());
            artist.setRoles(roles);
            artist.setIsFeatured(false);
            artist.setIsActivated(false);
            artist.setActivationCode(UUID.randomUUID().toString());
            artist.setDateOfRegistration(LocalDate.now());
            artist.setCommentsAllowed(true);
            artist.setCart(new Cart());
            artist.setPlayerQueue(new Playlist());
            artistRepository.save(artist);
            String activationLink = musicPortalDomain + "?activationCode=" + artist.getActivationCode();
            String activationMessage = String.format("Hi, %s! Welcome to Miraculous. To complete registration, please, " +
                    "follow his link %s", artist.getLogin(), activationLink);
            mailSenderService.sendMessage(artist.getEmail(), "Miraculous. Activation Code", activationMessage);
            return new ResponseEntity<>(new ResponseMessage("Artist "+ artist.getLogin()+" successfully registered. To complete registration, please, follow in your email")
                    ,HttpStatus.OK);

        }if( visitorRegistrationDto.getRole().equals("user")){

            User user = new User();
            List<Role> roles = new ArrayList<>();
            roles.add(roleRepository.findByTitle("ROLE_USER").get());
            user.setLogin(visitorRegistrationDto.getLogin());
            user.setPassword(bCryptPasswordEncoder.encode(visitorRegistrationDto.getPassword()));
            user.setEmail(visitorRegistrationDto.getEmail());
            user.setRoles(roles);
            user.setIsActivated(false);
            user.setDateOfRegistration(LocalDate.now());
            user.setActivationCode(UUID.randomUUID().toString());
            user.setDateOfRegistration(LocalDate.now());
            user.setPlayerQueue(new Playlist());
            user.setCart(new Cart());
            siteVisitorRepository.save(user);
            String activationLink = musicPortalDomain + "?activationCode=" + user.getActivationCode();
            String activationMessage = String.format("Hi, %s! Welcome to Miraculous. To complete registration, please, " +
                    "follow his link %s", user.getLogin(), activationLink);
            mailSenderService.sendMessage(user.getEmail(), "Miraculous. Activation Code", activationMessage);
            return new ResponseEntity<>(new ResponseMessage("User "+ user.getLogin()+" successfully registered."), HttpStatus.OK);
        }

        return new ResponseEntity<>(new ResponseMessage("Something went wrong"), HttpStatus.NOT_ACCEPTABLE);
    }
}
