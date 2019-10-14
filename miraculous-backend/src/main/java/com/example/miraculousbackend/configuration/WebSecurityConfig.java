package com.example.miraculousbackend.configuration;

import com.example.miraculousbackend.authorization.JwtAuthEntryPoint;
import com.example.miraculousbackend.authorization.JwtAuthTokenFilter;
import com.example.miraculousbackend.services.UserDetailsServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class
WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserDetailsServiceImplementation userDetailsServiceImplementation;
    private JwtAuthEntryPoint unauthorizedHandler;


    @Autowired
    public void setUserDetailsServiceImplementation(UserDetailsServiceImplementation userDetailsServiceImplementation) {
        this.userDetailsServiceImplementation = userDetailsServiceImplementation;
    }

    @Autowired
    public void setUnauthorizedHandler(JwtAuthEntryPoint unauthorizedHandler) {
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public JwtAuthTokenFilter authJwtTokenFilter(){

        return new JwtAuthTokenFilter();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder getBCryptPasswordEncoder(){

        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable().authorizeRequests()

                .antMatchers("/authorization/**").permitAll()
                .antMatchers("/registration/**").permitAll()
                .antMatchers("/activate/**").permitAll()
                .antMatchers("/genres/**").permitAll()
                .antMatchers("/images/**").permitAll()
                .antMatchers("/artists/**").permitAll()
                .antMatchers("/albums/**").permitAll()
                .antMatchers("/tracks/**").permitAll()
                .antMatchers("/songs/**").permitAll()
                .antMatchers("/search/**").permitAll()
                .anyRequest().authenticated().and().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);


        http.addFilterBefore(authJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImplementation).passwordEncoder(getBCryptPasswordEncoder());
    }
}
