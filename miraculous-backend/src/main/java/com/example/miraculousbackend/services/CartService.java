package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.SiteVisitor;
import com.example.miraculousbackend.entities.Track;
import com.example.miraculousbackend.mappers.AlbumMapper;
import com.example.miraculousbackend.mappers.TrackMapper;
import com.example.miraculousbackend.repositories.AlbumRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.repositories.TrackRepository;
import com.example.miraculousbackend.utils.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private SiteVisitorRepository siteVisitorRepository;
    private TrackMapper trackMapper;
    private AlbumMapper albumMapper;
    private AlbumRepository albumRepository;
    private TrackRepository trackRepository;

    @Autowired
    public void setAlbumMapper(AlbumMapper albumMapper) {
        this.albumMapper = albumMapper;
    }

    @Autowired
    public void setTrackMapper(TrackMapper trackMapper) {
        this.trackMapper = trackMapper;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Autowired
    public void setAlbumRepository(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Autowired
    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }



    @Transactional
    public ResponseEntity<?> putOrRemoveAlbumFromCart(AlbumCartDto albumCartDto){

        if (siteVisitorRepository.findById(albumCartDto.getVisitorId()).isPresent()){
            if (albumRepository.findById(albumCartDto.getAlbumId()).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(albumCartDto.getVisitorId()).get();
                Album album = albumRepository.findById(albumCartDto.getAlbumId()).get();
                if (siteVisitor.getCart().getListOfAlbums().contains(album)){

                    siteVisitor.getCart().getListOfAlbums().remove(album);
                    siteVisitorRepository.save(siteVisitor);
                    AlbumLinkDto albumLinkDto = albumMapper.convertAlbumEntityToAlbumLinkDto(album, albumCartDto.getVisitorId());
                    albumLinkDto.setInCartOfCurrentVisitor(false);
                    return new ResponseEntity<>(albumLinkDto, HttpStatus.OK);

                }else {

                    siteVisitor.getCart().getListOfAlbums().add(album);
                    siteVisitorRepository.save(siteVisitor);
                    AlbumLinkDto albumLinkDto = albumMapper.convertAlbumEntityToAlbumLinkDto(album, albumCartDto.getVisitorId());
                    albumLinkDto.setInCartOfCurrentVisitor(true);
                    return new ResponseEntity<>(albumLinkDto, HttpStatus.OK);
                }

            }else {

                return new ResponseEntity<>(new ResponseMessage("Album not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> putOrRemoveTrackFromCart(TrackCartDto trackCartDto){

        if (siteVisitorRepository.findById(trackCartDto.getVisitorId()).isPresent()){
            if (trackRepository.findById(trackCartDto.getTrackId()).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(trackCartDto.getVisitorId()).get();
                Track track = trackRepository.findById(trackCartDto.getTrackId()).get();
                System.out.println(siteVisitor);
                if (siteVisitor.getCart().getListOfTracks().contains(track)){

                    siteVisitor.getCart().getListOfTracks().remove(track);
                    siteVisitorRepository.save(siteVisitor);
                    TrackLinkDto trackLinkDto = trackMapper.convertTrackEntityToTrackLinkDto(track);
                    trackLinkDto.setInCartOfCurrentVisitor(false);

                    return new ResponseEntity<>(trackLinkDto, HttpStatus.OK);
                }else {

                    siteVisitor.getCart().getListOfTracks().add(track);
                    siteVisitorRepository.save(siteVisitor);
                    TrackLinkDto trackLinkDto = trackMapper.convertTrackEntityToTrackLinkDto(track);
                    trackLinkDto.setInCartOfCurrentVisitor(true);
                    System.out.println(trackLinkDto);
                    return new ResponseEntity<>(trackLinkDto, HttpStatus.OK);

                }

            }else {

                return new ResponseEntity<>(new ResponseMessage("Track not found"), HttpStatus.NOT_FOUND);
            }
        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }

    }
}
