package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.*;
import com.example.miraculousbackend.entities.Album;
import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.SiteVisitor;
import com.example.miraculousbackend.entities.Track;
import com.example.miraculousbackend.mappers.AlbumMapper;
import com.example.miraculousbackend.mappers.GenreMapper;
import com.example.miraculousbackend.mappers.SiteVisitorMapper;
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
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class SiteVisitorService {

    private SiteVisitorRepository siteVisitorRepository;
    private SiteVisitorMapper siteVisitorMapper;
    private TrackRepository trackRepository;
    private AlbumRepository albumRepository;
    private GenreMapper genreMapper;
    private AlbumMapper albumMapper;
    private TrackMapper trackMapper;

    @Autowired
    public void setTrackRepository(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    @Autowired
    public void setAlbumRepository(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Autowired
    public void setTrackMapper(TrackMapper trackMapper) {
        this.trackMapper = trackMapper;
    }

    @Autowired
    public void setAlbumMapper(AlbumMapper albumMapper) {
        this.albumMapper = albumMapper;
    }

    @Autowired
    public void setGenreMapper(GenreMapper genreMapper) {
        this.genreMapper = genreMapper;
    }

    @Autowired
    public void setSiteVisitorMapper(SiteVisitorMapper siteVisitorMapper) {
        this.siteVisitorMapper = siteVisitorMapper;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Transactional
    public ResponseEntity<?> saveOrUpdateSiteVisitorPlaylist(long siteVisitorId, List<Long> idsOfTracksInQueue){

        if (idsOfTracksInQueue != null){

            if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

                if (idsOfTracksInQueue.size() == 0){

                    SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
                    siteVisitor.getPlayerQueue().getListOfTracks().clear();
                    siteVisitorRepository.save(siteVisitor);
                    return new ResponseEntity<>(HttpStatus.OK);
                }
                if (trackRepository.existsAllById(idsOfTracksInQueue)){

                    List<Track> trackList = trackRepository.findAllById(idsOfTracksInQueue);
                    SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
                    siteVisitor.getPlayerQueue().setListOfTracks(trackList);
                    siteVisitorRepository.save(siteVisitor);
                    return new ResponseEntity<>(HttpStatus.OK);

                }else {

                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }else {

                return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("You must provide list of tracks as playlist"), HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    public ResponseEntity<?> getSiteVisitorPlaylist(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            List<Track> tracksInPlaylist = siteVisitorRepository.findById(siteVisitorId).get().getPlayerQueue().getListOfTracks();
            return new ResponseEntity<>(tracksInPlaylist.stream().map(track -> trackMapper.convertTrackEntityToPlayableTrackDto(track, siteVisitorId)), HttpStatus.OK);

        }else {

            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteAllAlbumsFromPurchased(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            siteVisitor.getPurchasedAlbums().clear();
            siteVisitorRepository.save(siteVisitor);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteAllTracksFromPurchased(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            siteVisitor.getPurchasedTracks().clear();
            siteVisitorRepository.save(siteVisitor);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteTrackFromPurchased(long trackId, long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){
            if (trackRepository.findById(trackId).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
                Track track = trackRepository.findById(trackId).get();
                siteVisitor.getPurchasedTracks().remove(track);
                siteVisitorRepository.save(siteVisitor);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {

                return new ResponseEntity<>(new ResponseMessage("Track not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteAlbumTrackFromPurchased(long albumId, long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){
            if (albumRepository.findById(albumId).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
                Album album = albumRepository.findById(albumId).get();
                siteVisitor.getPurchasedAlbums().remove(album);
                siteVisitorRepository.save(siteVisitor);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {

                return new ResponseEntity<>(new ResponseMessage("Album not found"), HttpStatus.NOT_FOUND);
            }

        }else {
            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getTracksInPurchased(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            List<Track> tracks = siteVisitor.getPurchasedTracks();
            return getResponseEntity(siteVisitorId, tracks);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getAlbumTracksInPurchased(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            List<Track> albumTracks = new ArrayList<>();
            for (int i = 0; i < siteVisitor.getPurchasedAlbums().size() ; i++) {

                albumTracks.addAll(siteVisitor.getPurchasedAlbums().get(i).getTracks());
            }
            return getResponseEntity(siteVisitorId, albumTracks);
        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    private ResponseEntity<?> getResponseEntity(long siteVisitorId, List<Track> albumTracks) {
        albumTracks.forEach(track -> track.setIsFree(true));
        List<PlayableTrackDto> playableTrackDtoList = albumTracks.stream().map(track ->
                trackMapper.convertTrackEntityToPlayableTrackDto(track,siteVisitorId)).collect(Collectors.toList());
        albumTracks.forEach(track -> track.setIsFree(false));
        return new ResponseEntity<>(playableTrackDtoList, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> transferTracksAndAlbumsFromCartToPurchased(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            if (siteVisitor.getCart().getListOfTracks().size() != 0 || siteVisitor.getCart().getListOfAlbums().size() != 0){

                siteVisitor.getPurchasedAlbums().addAll(siteVisitor.getCart().getListOfAlbums());
                siteVisitor.getPurchasedTracks().addAll(siteVisitor.getCart().getListOfTracks());
                siteVisitorRepository.save(siteVisitor);
                emptySiteVisitorCart(siteVisitorId);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {

                return new ResponseEntity<>("User does not have any tracks or albums in the cart", HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> emptySiteVisitorCart(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            siteVisitor.getCart().getListOfAlbums().clear();
            siteVisitor.getCart().getListOfTracks().clear();
            siteVisitorRepository.save(siteVisitor);
            return new ResponseEntity<>(HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getSiteVisitorAlbumsInCart(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            List<AlbumLinkDto> albumLinkDtoList = siteVisitor.getCart().getListOfAlbums().stream()
                    .map(album -> albumMapper.convertAlbumEntityToAlbumLinkDto(album, siteVisitorId)).collect(Collectors.toList());
            return new ResponseEntity<>(albumLinkDtoList, HttpStatus.OK);

        }else {
            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getSiteVisitorTracksInCart(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
            List<TrackLinkDto> trackLinkDtoList = siteVisitor.getCart().getListOfTracks().stream()
                    .map(track -> trackMapper.convertTrackEntityToTrackLinkDto(track)).collect(Collectors.toList());
            return new ResponseEntity<>(trackLinkDtoList, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteAlbumFromSiteVisitorCart(long siteVisitorId, long albumId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){
            if (albumRepository.findById(albumId).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
                Album album = albumRepository.findById(albumId).get();
                siteVisitor.getCart().getListOfAlbums().remove(album);
                siteVisitorRepository.save(siteVisitor);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {
                return new ResponseEntity<>(new ResponseMessage("Album not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> deleteTrackFromSiteVisitorCart(long siteVisitorId, long trackId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){
            if (trackRepository.findById(trackId).isPresent()){

                SiteVisitor siteVisitor = siteVisitorRepository.findById(siteVisitorId).get();
                Track track = trackRepository.findById(trackId).get();
                siteVisitor.getCart().getListOfTracks().remove(track);
                siteVisitorRepository.save(siteVisitor);
                return new ResponseEntity<>(HttpStatus.OK);

            }else {
                return new ResponseEntity<>(new ResponseMessage("Track not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("User not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getSiteVisitorGenresById(long id){

        if (siteVisitorRepository.findById(id).isPresent()){

            if (siteVisitorRepository.findById(id).get().getGenres() == null){

                return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
            }else {
                List<Genre> genres = siteVisitorRepository.findById(id).get().getGenres();
                List<GenreDto> genreDtoList = genres.stream().map(genre -> genreMapper.convertGenreEntityToGenreDtoWithoutLikes(genre))
                        .collect(Collectors.toList());
                return new ResponseEntity<>(genreDtoList, HttpStatus.OK);
            }
        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<ResponseMessage> deleteSiteVisitorById(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            siteVisitorRepository.deleteById(siteVisitorId);
            return new ResponseEntity<>(new ResponseMessage("User with id "+ " successfully deleted"), HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User with id "+ siteVisitorId + " not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<?> getSiteVisitorByLogin(String login){

        if (siteVisitorRepository.findByLogin(login).isPresent()){

            SiteVisitorDto siteVisitorDto = siteVisitorMapper.convertSiteVisitorEntityToSiteVisitorDto(siteVisitorRepository.findByLogin(login).get());
            return new ResponseEntity<>(siteVisitorDto, HttpStatus.OK);

        }else {

            return new ResponseEntity<>(new ResponseMessage("User with login "+ login + " not found"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public boolean activate(String activationCode){

        if (checkIfActivated(activationCode)){

            return false;
        }
        SiteVisitor siteVisitor = findByActivationCode(activationCode);
        siteVisitor.setIsActivated(true);
        siteVisitor.setActivationCode(null);
        siteVisitorRepository.save(siteVisitor);

        return true;
    }

    @Transactional
    public boolean checkIfActivated(String activationCode){

        return findByActivationCode(activationCode).getIsActivated();
    }

    @Transactional
    public SiteVisitor findByActivationCode(String activationCode){

        checkIfExistsByActivationCode(activationCode);

        return siteVisitorRepository.findByActivationCode(activationCode).get();
    }

    @Transactional
    public boolean checkIfExistsByActivationCode(String activationCode){

        if (!siteVisitorRepository.existsByActivationCode(activationCode)){

            return false;
        }

        return true;
    }

    @Transactional
    public Optional<SiteVisitor> findSiteVisitorById(long siteVisitorId){

        if (siteVisitorRepository.findById(siteVisitorId).isPresent()){

            return siteVisitorRepository.findById(siteVisitorId);
        }else {

            Optional<SiteVisitor> siteVisitor = Optional.empty();
            return siteVisitor;
        }
    }
}
