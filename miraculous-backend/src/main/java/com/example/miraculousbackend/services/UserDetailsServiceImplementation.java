package com.example.miraculousbackend.services;

import com.example.miraculousbackend.authorization.UserPrincipal;
import com.example.miraculousbackend.entities.SiteVisitor;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class UserDetailsServiceImplementation implements UserDetailsService {

    private SiteVisitorRepository siteVisitorRepository;

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        SiteVisitor siteVisitor = siteVisitorRepository.findByLogin(login).get();

        if (siteVisitor == null){

            throw new UsernameNotFoundException("User does not exist");
        }

        UserPrincipal userPrincipal = new UserPrincipal(siteVisitorRepository.findByLogin(login).get());
        return userPrincipal;
    }
}
