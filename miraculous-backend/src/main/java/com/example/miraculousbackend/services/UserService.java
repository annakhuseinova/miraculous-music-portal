package com.example.miraculousbackend.services;

import com.example.miraculousbackend.dto.GenreDto;
import com.example.miraculousbackend.dto.UserProfileDto;
import com.example.miraculousbackend.dto.UserSettingsDto;
import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.Image;
import com.example.miraculousbackend.entities.User;
import com.example.miraculousbackend.mappers.GenreMapper;
import com.example.miraculousbackend.mappers.UserMapper;
import com.example.miraculousbackend.repositories.*;
import com.example.miraculousbackend.utils.ResponseMessage;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class UserService {

    private UserRepository userRepository;
    private UserMapper userMapper;
    private SiteVisitorRepository siteVisitorRepository;
    @Value("${music.images.upload.path}")
    private String imagesUploadPath;
    private ImageRepository imageRepository;
    private GenreMapper genreMapper;
    private ImageService imageService;
    private FileStorageService fileStorageService;

    @Autowired
    public void setImageService(ImageService imageService) {
        this.imageService = imageService;
    }

    @Autowired
    public void setFileStorageService(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @Autowired
    public void setGenreMapper(GenreMapper genreMapper) {
        this.genreMapper = genreMapper;
    }

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    @Autowired
    public void setImageRepository(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Transactional
    public ResponseEntity<?> deleteUserPhoto(String imageUrl, long userId){

        if (siteVisitorRepository.findById(userId).isPresent()){

            if (imageRepository.findByImageUrl(imageUrl).isPresent()){

                User user = userRepository.findById(userId).get();
                imageService.deleteImageByImageUrl(imageUrl);

                try {
                    fileStorageService.deleteImageFromImageByImageUrlName(imageUrl);

                } catch (IOException e) {

                    e.printStackTrace();
                }
                user.setPicture(null);
                userRepository.save(user);

                return new ResponseEntity<>(new ResponseMessage("Successfully deleted  user image"), HttpStatus.OK);

            }else {

                return new ResponseEntity<>(new ResponseMessage("Image not found"), HttpStatus.NOT_FOUND);
            }

        }else {

            return new ResponseEntity<>(new ResponseMessage("Artist not found"), HttpStatus.NOT_FOUND);
        }
    }


    @Transactional
    public ResponseEntity<?> updateUserSettings(MultipartFile coverPicture, UserSettingsDto userSettingsDto, List<GenreDto> genreDtos){


        try {

            if (siteVisitorRepository.findById(userSettingsDto.getId()).isPresent()){

                User user = userMapper.convertUserSettingsDtoToUserEntity(userSettingsDto);
                List<Genre> userGenres = genreDtos.stream().map(genreDto ->
                        genreMapper.convertGenreDtoToGenreEntity(genreDto)).collect(Collectors.toList());
                user.setGenres(userGenres);
                if (coverPicture != null){

                    if (user.getPicture() != null){

                        fileStorageService.deleteImageFromImageByImageUrlName(user.getPicture().getImageUrl());
                        imageService.deleteImageById(user.getPicture().getId());
                    }

                    user.setPicture(fileStorageService.storeImage(coverPicture));
                }
                saveUser(user);
                return new ResponseEntity<>(userMapper.convertUserEntityToUserSettingsDto(user), HttpStatus.OK);

            }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
       return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }

    @Transactional
    public ResponseEntity<?> getUserSettings(long userId){

        if (siteVisitorRepository.findById(userId).isPresent()){

            User user = userRepository.findById(userId).get();
            return new ResponseEntity<>(userMapper.convertUserEntityToUserSettingsDto(user), HttpStatus.OK);

        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public long getNumberOfRegisteredUsers(){
        return userRepository.count();
    }

    @Transactional
    public ResponseEntity<?> getUserProfileInfoById(long userId){

        if (siteVisitorRepository.findById(userId).isPresent()){

            UserProfileDto userProfileDto = userMapper.convertUserEntityToUserProfileDto(userRepository.findById(userId).get());
            return new ResponseEntity<>(userProfileDto, HttpStatus.OK);
        }else {

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public User saveUser(User user){

        return siteVisitorRepository.save(user);
    }
}
