import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ArtistServiceService} from "../../../../services/artist-service/artist-service.service";
import {ArtistLinkDto} from "../../../../dto/artist-link-dto/artist-link-dto";

@Component({
  selector: 'add-artist-to-featured',
  templateUrl: './add-artist-to-featured.component.html',
  styleUrls: ['./add-artist-to-featured.component.css']
})
export class AddArtistToFeaturedComponent implements OnInit {

  @Output() onArtistAdditionToFeatured = new EventEmitter();
  artistToBeAddedToFeatured: ArtistLinkDto = new ArtistLinkDto();
  artistLogin: string;
  isArtistToBeAddedToFeaturedFound: boolean;
  isArtistToBeAddedToFeaturedNotFound: boolean;
  hasArtistBeenAddedToFeatured: boolean;
  hasArtistFailedToBeAddedToFeatured: boolean;
  artistNotFoundMessage: string;
  artistNotAddedToFeaturedMessage: string;

  constructor(private artistService: ArtistServiceService) { }

  getArtistByArtistLogin() {

    this.hasArtistFailedToBeAddedToFeatured = false;
    this.hasArtistBeenAddedToFeatured = false;

    this.artistService.getArtistByArtistLogin(this.artistToBeAddedToFeatured.login).subscribe(

      response => {

        if (response.status == 200){

          this.isArtistToBeAddedToFeaturedNotFound = false;
          this.artistToBeAddedToFeatured = response.body as ArtistLinkDto;
          this.artistLogin = this.artistToBeAddedToFeatured.login;
          this.isArtistToBeAddedToFeaturedFound = true;
        }
      },

      error1 => {

        if(error1.status == 404){
          this.isArtistToBeAddedToFeaturedFound = false;
          this.artistNotFoundMessage = this.artistToBeAddedToFeatured.login + " not found";
          this.isArtistToBeAddedToFeaturedNotFound  = true;
        }
      }
    )
  }

  addArtistToFeaturedByArtistId(artistId: number){

    this.isArtistToBeAddedToFeaturedNotFound = false;
    this.isArtistToBeAddedToFeaturedFound = false;

    this.artistService.addArtistToFeaturedByArtistId(artistId).subscribe(

      response => {

        if (response.status == 200){

          this.artistLogin = this.artistToBeAddedToFeatured.login;
          this.hasArtistFailedToBeAddedToFeatured = false;
          this.hasArtistBeenAddedToFeatured = true;
          this.onArtistAdditionToFeatured.emit();

        }

      },
      error1 => {

        if (error1.status == 404){

          this.hasArtistBeenAddedToFeatured = false;
          this.hasArtistFailedToBeAddedToFeatured = true;
          this.artistNotAddedToFeaturedMessage = this.artistToBeAddedToFeatured.login + " failed to be added to featured";
        }
      }
    )
  }

  ngOnInit() {

  }

  closeArtistFoundMessage() {

    this.isArtistToBeAddedToFeaturedFound = false;
  }

  closeFailedToAddArtistMessage() {

    this.hasArtistFailedToBeAddedToFeatured = false;
  }

  closeSuccessfullyAddedArtistToFeaturedMessage() {

    this.hasArtistBeenAddedToFeatured = false;
  }

  closeArtistNotFoundMessage() {

    this.isArtistToBeAddedToFeaturedNotFound = false;
  }


}
