package com.example.miraculousbackend.comparators;

import com.example.miraculousbackend.entities.SiteVisitor;
import com.example.miraculousbackend.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Comparator;

@Component
public class ArtistByTotalNumberOfLikesComparator implements Comparator<SiteVisitor> {

    private ArtistService artistService;

    @Autowired
    public void setArtistService(ArtistService artistService) {
        this.artistService = artistService;
    }

    @Override
    public int compare(SiteVisitor o1, SiteVisitor o2) {

        if (artistService.getTotalNumberOfArtistLikes(o1.getId()) > artistService.getTotalNumberOfArtistLikes(o2.getId())){

            return 1;

        }else if (artistService.getTotalNumberOfArtistLikes(o1.getId()) < artistService.getTotalNumberOfArtistLikes(o2.getId())){

            return -1;

        }else {

            return 0;
        }
    }
}
