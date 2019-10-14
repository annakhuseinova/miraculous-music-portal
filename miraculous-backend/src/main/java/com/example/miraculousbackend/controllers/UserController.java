package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.GenreDto;
import com.example.miraculousbackend.dto.UserSettingsDto;
import com.example.miraculousbackend.mappers.UserMapper;
import com.example.miraculousbackend.repositories.SiteVisitorRepository;
import com.example.miraculousbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    private UserService userService;
    private SiteVisitorRepository siteVisitorRepository;
    @Value("${music.images.upload.path}")
    private String  imagesUploadPath;
    private HashMap<String, String> userSettingsValidationErrors;

    @Autowired
    public void setSiteVisitorRepository(SiteVisitorRepository siteVisitorRepository) {
        this.siteVisitorRepository = siteVisitorRepository;
    }

    private UserMapper userMapper;

    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/{userId}/images/{imageUrl}")
    @Secured("ROLE_USER")
    public ResponseEntity<?> deleteUserByUserIdAndImageUrl(@PathVariable("userId") long userId, @PathVariable("imageUrl") String imageUrl){

        return userService.deleteUserPhoto(imageUrl, userId);
    }

    @PostMapping("/settings")
    @Secured("ROLE_USER")
    public ResponseEntity<?> updateUserSettings(@RequestParam(value = "coverPictureFile", required = false) MultipartFile multipartFile,
                                                @RequestPart("userSettingsDto") @Valid UserSettingsDto userSettingsDto, BindingResult bindingResult,
                                                @RequestPart(value = "userFavouriteGenres", required = false) List<GenreDto> userFavouriteGenres){
        if (bindingResult.hasErrors()){

            userSettingsValidationErrors = new HashMap<>();

            for (FieldError fieldError: bindingResult.getFieldErrors()){
                userSettingsValidationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return new ResponseEntity<>(userSettingsValidationErrors, HttpStatus.BAD_REQUEST);
        }

        return userService.updateUserSettings(multipartFile, userSettingsDto, userFavouriteGenres);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfileInfo(@PathVariable("userId") long userId){

        return userService.getUserProfileInfoById(userId);
    }

    @GetMapping("/{userId}/settings")
    public ResponseEntity<?> getUserSettings(@PathVariable("userId") long userId){

       return userService.getUserSettings(userId);
    }


    @GetMapping("/number")
    public long getNumberOfRegisteredUsers(){

        return userService.getNumberOfRegisteredUsers();
    }


}
