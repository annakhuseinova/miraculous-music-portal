package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.SiteVisitorDto;
import com.example.miraculousbackend.entities.SiteVisitor;
import org.springframework.stereotype.Component;

@Component
public class SiteVisitorMapper {


    public SiteVisitorDto convertSiteVisitorEntityToSiteVisitorDto(SiteVisitor siteVisitor){

        SiteVisitorDto siteVisitorDto = new SiteVisitorDto();
        siteVisitorDto.setId(siteVisitor.getId());
        siteVisitorDto.setLogin(siteVisitor.getLogin());
        siteVisitorDto.setDateOfRegistration(siteVisitor.getDateOfRegistration().toString());
        return siteVisitorDto;
    }
}
