package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.AlbumLinkDto;
import com.example.miraculousbackend.dto.AlbumUploadDto;
import com.example.miraculousbackend.dto.FullAlbumInfoDto;
import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.SiteVisitor;
import com.example.miraculousbackend.repositories.AlbumRepository;
import com.example.miraculousbackend.repositories.ArtistRepository;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class AlbumMapper {

    private SiteVisitorRepository siteVisitorRepository;
    private ArtistRepository artistRepository;

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    public Album convertAlbumUploadDtoIntoAlbumEntity(AlbumUploadDto albumUploadDto, List<Genre> genreList){

        Album album = new Album();
        album.setId(null);
        album.setIsFeatured(false);
        album.setTitle(albumUploadDto.getTitle());
        album.setArtist(artistRepository.findById(albumUploadDto.getArtistId()).get());
        if (albumUploadDto.getDescription() != null && albumUploadDto.getDescription().length() != 0){

            album.setDescription(null);
        }else {
            album.setDescription(null);
        }
        album.setDateOfRelease(albumUploadDto.getDateOfRelease());
        album.setIsFree(albumUploadDto.getIsFree());
        album.setPrice(albumUploadDto.getPrice());
        album.setLength(albumUploadDto.getDuration());
        album.setComments(new ArrayList<>());
        album.setTracks(new ArrayList<>());
        album.setVisitorsWhoLikedThisAlbum(new ArrayList<>());
        album.setGenres(genreList);
        return album;
    }

    public AlbumLinkDto convertAlbumEntityToAlbumLinkDto(Album album, long visitorId){

        AlbumLinkDto albumLinkDto = new AlbumLinkDto();
        albumLinkDto.setId(album.getId());
        albumLinkDto.setTitle(album.getTitle());
        albumLinkDto.setArtistId(album.getArtist().getId());
        albumLinkDto.setArtistLogin(album.getArtist().getLogin());
        albumLinkDto.setNumberOfLikes((long)album.getVisitorsWhoLikedThisAlbum().size());
        albumLinkDto.setNumberOfTracks((long)album.getTracks().size());
        albumLinkDto.setGenres(GenreToStringAndReverseConverter.convertGenreObjectsToStrings(album.getGenres()));
        if (album.getCoverPicture() != null){
            albumLinkDto.setAlbumCoverPictureUrlName(album.getCoverPicture().getImageUrl());
        }else {
            albumLinkDto.setAlbumCoverPictureUrlName(null);
        }
        albumLinkDto.setDateOfRelease(album.getDateOfRelease());
        albumLinkDto.setIsFree(album.getIsFree());
        albumLinkDto.setPrice(album.getPrice());

        if (siteVisitorRepository.findById(visitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(visitorId).get();
            if (album.getVisitorsWhoLikedThisAlbum().contains(siteVisitor)){

                albumLinkDto.setLikedByCurrentVisitor(true);

            }else {

                albumLinkDto.setLikedByCurrentVisitor(false);
            }

            if (siteVisitor.getCart().getListOfAlbums().contains(album)){

                albumLinkDto.setInCartOfCurrentVisitor(true);

            }else {

                albumLinkDto.setInCartOfCurrentVisitor(false);
            }

        }else {

            albumLinkDto.setInCartOfCurrentVisitor(false);
            albumLinkDto.setLikedByCurrentVisitor(false);
        }
        return albumLinkDto;
    }


    public FullAlbumInfoDto convertAlbumEntityToFullAlbumInfoDto(Album album, long visitorId){

        FullAlbumInfoDto fullAlbumInfoDto = new FullAlbumInfoDto();
        if (siteVisitorRepository.findById(visitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(visitorId).get();
            if (siteVisitor.getCart().getListOfAlbums().contains(album)){

                fullAlbumInfoDto.setInCartOfCurrentVisitor(true);

            }else {

                fullAlbumInfoDto.setInCartOfCurrentVisitor(false);
            }
            if (album.getVisitorsWhoLikedThisAlbum().contains(siteVisitor)){

                fullAlbumInfoDto.setLikedByCurrentVisitor(true);

            }else {

                fullAlbumInfoDto.setLikedByCurrentVisitor(false);
            }
        }else {

            fullAlbumInfoDto.setInCartOfCurrentVisitor(false);
            fullAlbumInfoDto.setLikedByCurrentVisitor(false);
        }
        fullAlbumInfoDto.setId(album.getId());
        fullAlbumInfoDto.setTitle(album.getTitle());
        fullAlbumInfoDto.setArtistId(album.getArtist().getId());
        fullAlbumInfoDto.setArtistLogin(album.getArtist().getLogin());
        fullAlbumInfoDto.setDateOfRelease(album.getDateOfRelease());
        fullAlbumInfoDto.setNumberOfTracks(album.getTracks().size());
        fullAlbumInfoDto.setAlbumDuration(album.getLength());
        fullAlbumInfoDto.setGenres(GenreToStringAndReverseConverter.convertGenreObjectsToStrings(album.getGenres()));
        fullAlbumInfoDto.setDescription(album.getDescription());
        fullAlbumInfoDto.setIsFree(album.getIsFree());
        fullAlbumInfoDto.setPrice(album.getPrice());
        fullAlbumInfoDto.setNumberOfLikes((long)album.getVisitorsWhoLikedThisAlbum().size());
        if (album.getCoverPicture() != null){
            fullAlbumInfoDto.setCoverPictureUrlName(album.getCoverPicture().getImageUrl());
        }else {
            fullAlbumInfoDto.setCoverPictureUrlName(null);
        }
        fullAlbumInfoDto.setSize(album.getSize());
        return fullAlbumInfoDto;
    }
}
