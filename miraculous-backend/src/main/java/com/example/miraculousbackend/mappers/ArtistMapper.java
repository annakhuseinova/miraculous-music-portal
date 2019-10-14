package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.ArtistLinkDto;
import com.example.miraculousbackend.dto.ArtistProfileDto;
import com.example.miraculousbackend.dto.ArtistSettingsDto;
import com.example.miraculousbackend.entities.Artist;
import com.example.miraculousbackend.repositories.ArtistRepository;
import com.example.miraculousbackend.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ArtistMapper {

    private ArtistRepository artistRepository;
    private ArtistService artistService;

    @Autowired
    public void setArtistService(ArtistService artistService) {
        this.artistService = artistService;
    }

    @Autowired
    public void setArtistRepository(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public ArtistLinkDto convertArtistEntityToArtistLinkDto(Artist artist){

        ArtistLinkDto artistLinkDto = new ArtistLinkDto();
        artistLinkDto.setId(artist.getId());
        artistLinkDto.setLogin(artist.getLogin());
        artistLinkDto.setPictureUrlName(artist.getPicture().getImageUrl());
        artistLinkDto.setGenres(GenreToStringAndReverseConverter.convertGenreObjectsToStrings(artist.getGenres()));
        artistLinkDto.setTotalNumberOfLikes(artistService.getTotalNumberOfArtistLikes(artist.getId()));
        artistLinkDto.setNumberOfTracks(artist.getListOfTracks().size());
        artistLinkDto.setNumberOfAlbums(artist.getListOfAlbums().size());
        return artistLinkDto;

    }

    public ArtistProfileDto convertArtistEntityToArtistProfileDto(Artist artist, long totalNumberOfLikes){

        ArtistProfileDto artistProfileDto = new ArtistProfileDto();
        artistProfileDto.setId(artist.getId());
        artistProfileDto.setLogin(artist.getLogin());
        artistProfileDto.setDateOfRegistration(artist.getDateOfRegistration().toString());
        if (artist.getDescription() == null || artist.getDescription().equals("")){

            artistProfileDto.setDescription("None");
        }else {

            artistProfileDto.setDescription(artist.getDescription());
        }
        if (artist.getLocation() == null || artist.getLocation().equals("")){
            artistProfileDto.setLocation("None");
        }else {
            artistProfileDto.setLocation(artist.getLocation());
        }

        if (artist.getPicture() != null){
            artistProfileDto.setPictureUrlName(artist.getPicture().getImageUrl());
        }else {

            artistProfileDto.setPictureUrlName(null);
        }
        artistProfileDto.setTotalNumberOfLikes(totalNumberOfLikes);
        artistProfileDto.setAreCommentsAllowed(artist.getCommentsAllowed());
        return artistProfileDto;
    }

    public ArtistSettingsDto convertArtistEntityIntoArtistSettingsDto(Artist artist){

        ArtistSettingsDto artistSettingsDto = new ArtistSettingsDto();
        artistSettingsDto.setId(artist.getId());
        artistSettingsDto.setAreCommentsAllowed(artist.getCommentsAllowed());
        artistSettingsDto.setDescription(artist.getDescription());
        artistSettingsDto.setEmail(artist.getEmail());
        artistSettingsDto.setLocation(artist.getLocation());
        if (artist.getPicture() != null){
            artistSettingsDto.setPictureUrlName(artist.getPicture().getImageUrl());
        }else {
            artistSettingsDto.setPictureUrlName(null);
        }
        return artistSettingsDto;

    }
 
    public Artist convertArtistSettingsDtoToArtistEntity(ArtistSettingsDto artistSettingsDto){

        Artist artist = artistRepository.findById(artistSettingsDto.getId()).get();
        if (artistSettingsDto.getPassword() != null && artistSettingsDto.getConfirmationPassword() != null){
            artist.setPassword(artistSettingsDto.getPassword());

        }
        artist.setLocation(artistSettingsDto.getLocation());
        artist.setDescription(artistSettingsDto.getDescription());
        artist.setEmail(artistSettingsDto.getEmail());
        artist.setCommentsAllowed(artistSettingsDto.getAreCommentsAllowed());
        return artist;
    }
}
