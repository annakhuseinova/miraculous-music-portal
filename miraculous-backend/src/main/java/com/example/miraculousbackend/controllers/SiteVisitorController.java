package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.services.SiteVisitorService;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/site-visitors")
public class SiteVisitorController {

    private SiteVisitorService siteVisitorService;

    @Autowired
    public void setSiteVisitorService(SiteVisitorService siteVisitorService) {
        this.siteVisitorService = siteVisitorService;
    }

    @PutMapping("/{site-visitor-id}/playlist")
    public ResponseEntity<?> saveOrUpdateSiteVisitorPlaylist(@PathVariable("site-visitor-id") long siteVisitorId, @RequestBody List<Long> idsOfPlaylistTracks){

        return siteVisitorService.saveOrUpdateSiteVisitorPlaylist(siteVisitorId, idsOfPlaylistTracks);
    }

    @GetMapping("/{site-visitor-id}/playlist")
    public ResponseEntity<?> getSiteVisitorPlaylist(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.getSiteVisitorPlaylist(siteVisitorId);
    }

    @PostMapping("/{site-visitor-id}/purchased")
    public ResponseEntity<?> transferTracksAndAlbumsToPurchased(@PathVariable("site-visitor-id") long siteVisitorId){

         return siteVisitorService.transferTracksAndAlbumsFromCartToPurchased(siteVisitorId);
    }

    @GetMapping("/{site-visitor-id}/purchased/tracks")
    public ResponseEntity<?> getSiteVisitorPurchasedTracks(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.getTracksInPurchased(siteVisitorId);
    }

    @GetMapping("/{site-visitor-id}/purchased/albums")
    public ResponseEntity<?> getSiteVisitorPurchasedAlbums(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.getAlbumTracksInPurchased(siteVisitorId);
    }

    @DeleteMapping("/{site-visitor-id}/purchased/albums/{albumId}")
    public ResponseEntity<?> deleteAlbumFromPurchased(@PathVariable("site-visitor-id") long siteVisitorId,
                                                           @PathVariable("albumId") long albumId){

        return siteVisitorService.deleteAlbumTrackFromPurchased(albumId, siteVisitorId);
    }

    @DeleteMapping("/{site-visitor-id}/purchased/tracks/{trackId}")
    public ResponseEntity<?> deleteTrackFromPurchased(@PathVariable("site-visitor-id") long visitorId, @PathVariable("trackId") long trackId){

        return siteVisitorService.deleteTrackFromPurchased(trackId, visitorId);
    }

    @DeleteMapping("/{site-visitor-id}/purchased/tracks")
    public ResponseEntity<?> deleteAllTracksFromPurchased(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.deleteAllTracksFromPurchased(siteVisitorId);
    }

    @DeleteMapping("/{site-visitor-id}/purchased/albums")
    public ResponseEntity<?> deleteAllAlbumsFromPurchased(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.deleteAllAlbumsFromPurchased(siteVisitorId);
    }

    @GetMapping("/{site-visitor-id}/genres")
    public ResponseEntity<?> getSiteVisitorGenres(@PathVariable("site-visitor-id") long id){

        return siteVisitorService.getSiteVisitorGenresById(id);
    }

    @GetMapping("/{site-visitor-id}/cart/albums")
    public ResponseEntity<?> getSiteVisitorCartAlbums(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.getSiteVisitorAlbumsInCart(siteVisitorId);
    }


    @GetMapping("/{site-visitor-id}/cart/tracks")
    public ResponseEntity<?> getSiteVisitorCartTracks(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.getSiteVisitorTracksInCart(siteVisitorId);
    }

    @DeleteMapping("/{site-visitor-id}/cart/all")
    public ResponseEntity<?> emptySiteVisitorCart(@PathVariable("site-visitor-id") long siteVisitorId){

        return siteVisitorService.emptySiteVisitorCart(siteVisitorId);
    }

    @DeleteMapping("/{site-visitor-id}/cart/tracks/{trackId}")
    public ResponseEntity<?> deleteTrackFromSiteVisitorCart(@PathVariable("site-visitor-id") long siteVisitorId, @PathVariable("trackId") long trackId){

        return siteVisitorService.deleteTrackFromSiteVisitorCart(siteVisitorId, trackId);
    }

    @DeleteMapping("/{site-visitor-id}/cart/albums/{albumId}")
    public ResponseEntity<?> deleteAlbumFromSiteVisitorCart(@PathVariable("site-visitor-id") long siteVisitorId, @PathVariable("albumId") long albumId){

        return siteVisitorService.deleteAlbumFromSiteVisitorCart(siteVisitorId, albumId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteSiteVisitorById(@PathVariable("id") long id){

        return siteVisitorService.deleteSiteVisitorById(id);
    }

    @GetMapping("/login/{login}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<?> getSiteVisitorByLogin(@PathVariable("login") String login){

        return siteVisitorService.getSiteVisitorByLogin(login);
    }
}
