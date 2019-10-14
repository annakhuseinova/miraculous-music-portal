package com.example.miraculousbackend.authorization;

import com.example.miraculousbackend.entities.SiteVisitor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private SiteVisitor siteVisitor;

    public UserPrincipal(SiteVisitor siteVisitor) {
        this.siteVisitor = siteVisitor;
    }

    @Override
    @Transactional
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        siteVisitor.getRoles().forEach(role -> {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getTitle());
            grantedAuthorities.add(grantedAuthority);
        });

        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return this.siteVisitor.getPassword();
    }

    @Override
    public String getUsername() {
        return this.siteVisitor.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
