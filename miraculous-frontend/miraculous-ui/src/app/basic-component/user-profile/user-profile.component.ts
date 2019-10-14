import {Component, Input, OnInit} from '@angular/core';
import {UserProfileDto} from "../../../dto/user-profile-dto/user-profile-dto";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";
import {TrackLinkDto} from "../../../dto/track-link-dto/track-link-dto";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {UserServiceService} from "../../../services/user-service/user-service.service";
import {DomainServiceService} from "../../../services/domain-service/domain-service.service";
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";
import {GenreDto} from "../../../dto/genre-dto/genre-dto";

@Component({
  selector: 'userprofile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: UserProfileDto = new UserProfileDto();
  errorMessage: string = "";
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  @Input() lastLikedAlbums: AlbumLinkDto[] = [];
  @Input() lastLikedTracks: TrackLinkDto[] = [];
  userFavouriteGenres: GenreDto[] = [];

  constructor(private tokenStorageService: TokenStorageServiceService, private userService: UserServiceService,
              private siteVisitorService: SiteVisitorServiceService) {

  }

  ngOnInit() {


    this.getUserProfileDto();
  }

  getUserProfileDto(){

    this.userService.getUserProfileDto(this.tokenStorageService.getVisitorId(this.tokenStorageService.isRememberMeModeOn()))
      .subscribe(
        result => {

          this.user = result;
          this.getUserFavouriteGenres();
        },
        error1 => {

          this.errorMessage = error1.message;
        }
      )
  }

  getUserFavouriteGenres(){

    this.siteVisitorService.getSiteVisitorGenres(this.tokenStorageService.getVisitorId(this.tokenStorageService.isRememberMeModeOn())).subscribe(

       data => {

         this.userFavouriteGenres = data.body;
       },

      error1 => {

         console.log(error1.message);
      }
    )
  }
}


