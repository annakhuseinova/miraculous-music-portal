package com.example.miraculousbackend.services;


import com.example.miraculousbackend.entities.Genre;
import com.example.miraculousbackend.entities.Image;
import com.example.miraculousbackend.entities.Track;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {


    @Value("${music.images.upload.path}")
    private String pathToImagesDirectory;

    @Value("${music.tracks.upload.path}")
    private String pathToTracksDirectory;

    private ImageService imageService;

    private TrackService trackService;

    @Autowired
    public void setImageService(ImageService imageService) {
        this.imageService = imageService;
    }

    @Autowired
    public void setTrackService(TrackService trackService) {
        this.trackService = trackService;
    }

    @Transactional
    public Image storeImage(MultipartFile multipartFile) throws IOException {

        Path path = Paths.get(pathToImagesDirectory);
        String storageImageName = UUID.randomUUID() + "." + FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        Files.copy(multipartFile.getInputStream(), path.resolve(storageImageName));

        return  imageService.saveNewImage(storageImageName);

    }

    @Transactional
    public boolean deleteImageFromImageByImageUrlName(String pictureUrlName) throws IOException {

        Path path = Paths.get(pathToImagesDirectory + File.separator + pictureUrlName);
        return Files.deleteIfExists(path);
    }

    @Transactional
    public Track storeTrack(MultipartFile trackFullVersion,
                            MultipartFile trackPreviewVersion,
                            Track trackEntity,
                            MultipartFile trackCover, List<Genre> trackGenres) throws IOException {

        Path pathToTracksDirectory = Paths.get(this.pathToTracksDirectory);
        String storageTrackFullVersionName =  UUID.randomUUID() + "." + FilenameUtils.getExtension(trackFullVersion.getOriginalFilename());
        Files.copy(trackFullVersion.getInputStream(), pathToTracksDirectory.resolve(storageTrackFullVersionName));
        trackEntity.setUrlToTrackFullVersion(storageTrackFullVersionName);
        if (trackPreviewVersion != null && !trackEntity.getIsFree()){

            String storageTrackPreviewVersionName = UUID.randomUUID() + "." + FilenameUtils.getExtension(trackPreviewVersion.getOriginalFilename());
            Files.copy(trackPreviewVersion.getInputStream(), pathToTracksDirectory.resolve(storageTrackPreviewVersionName));
            trackEntity.setUrlToTrackPreviewVersion(storageTrackPreviewVersionName);
        }
        if (trackCover != null){

            trackEntity.setCoverPicture(storeImage(trackCover));
        }
        trackEntity.setGenres(trackGenres);
        return trackService.saveTrack(trackEntity);
    }
}
