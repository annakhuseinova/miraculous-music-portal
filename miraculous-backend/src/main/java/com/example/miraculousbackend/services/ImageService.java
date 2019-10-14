package com.example.miraculousbackend.services;

import com.example.miraculousbackend.entities.Image;
import com.example.miraculousbackend.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ImageService {

    private ImageRepository imageRepository;

    @Autowired
    public void setImageRepository(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image saveNewImage(String imageUrlName){

        Image image = new Image();
        image.setImageUrl(imageUrlName);
        return imageRepository.save(image);
    }

    @Transactional
    public void deleteImageById(long imageId){

        imageRepository.deleteById(imageId);
    }

    @Transactional
    public void deleteImageByImageUrl(String imageUrl){

        imageRepository.deleteByImageUrl(imageUrl);
    }
}
