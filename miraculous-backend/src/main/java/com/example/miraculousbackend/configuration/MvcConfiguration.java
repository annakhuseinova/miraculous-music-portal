package com.example.miraculousbackend.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.servlet.annotation.MultipartConfig;

@Configuration
@MultipartConfig
public class MvcConfiguration implements WebMvcConfigurer {

    @Value("${music.tracks.upload.path}")
    private String musicTrackUploadPath;

    @Value("${music.images.upload.path}")
    private String musicImageUploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**").addResourceLocations("file:/" + musicImageUploadPath + "/");
        registry.addResourceHandler("/songs/**").addResourceLocations("file:/"+ musicTrackUploadPath + "/");
    }
}
