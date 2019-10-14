package com.example.miraculousbackend.mappers;

import com.example.miraculousbackend.dto.UserProfileDto;
import com.example.miraculousbackend.dto.UserSettingsDto;
import com.example.miraculousbackend.entities.User;
import com.example.miraculousbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public void setbCryptPasswordEncoder(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDto convertUserEntityToUserProfileDto(User user){

        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setId(user.getId());
        userProfileDto.setLogin(user.getLogin());
        userProfileDto.setEmail(user.getEmail());
        userProfileDto.setDateOfRegistration(user.getDateOfRegistration().toString());
        if (user.getDescription() == null || user.getDescription().equals("")){
            userProfileDto.setDescription("None");
        }else {
            userProfileDto.setDescription(user.getDescription());
        }
        if (user.getLocation() == null || user.getLocation().equals("")){

            userProfileDto.setLocation("None");
        }else {
            userProfileDto.setLocation(user.getLocation());
        }
        if (user.getPicture() == null){
            userProfileDto.setPictureUrlName("no-picture");
        }else {
            userProfileDto.setPictureUrlName(user.getPicture().getImageUrl());
        }
        return userProfileDto;
    }

    public User convertUserSettingsDtoToUserEntity(UserSettingsDto userSettingsDto){

        User user = userRepository.findById(userSettingsDto.getId()).get();
        user.setDescription(userSettingsDto.getDescription());
        user.setLocation(userSettingsDto.getLocation());
        user.setEmail(userSettingsDto.getEmail());
        if (userSettingsDto.getPassword() != null && userSettingsDto.getConfirmationPassword()!= null
                && userSettingsDto.getConfirmationPassword().equals(userSettingsDto.getPassword())){
            user.setPassword(bCryptPasswordEncoder.encode(userSettingsDto.getPassword()));
        }
        return user;
    }

    public UserSettingsDto convertUserEntityToUserSettingsDto(User user){

        UserSettingsDto userSettingsDto = new UserSettingsDto();
        userSettingsDto.setId(user.getId());
        userSettingsDto.setDescription(user.getDescription());
        userSettingsDto.setEmail(user.getEmail());
        userSettingsDto.setLocation(user.getLocation());
        if (user.getPicture() != null){
            userSettingsDto.setCoverPictureUrlName(user.getPicture().getImageUrl());
        }else {
            userSettingsDto.setCoverPictureUrlName(null);
        }
        return userSettingsDto;

    }
}
