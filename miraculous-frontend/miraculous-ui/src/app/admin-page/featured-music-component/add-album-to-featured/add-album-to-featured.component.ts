import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {ArtistServiceService} from "../../../../services/artist-service/artist-service.service";
import {ArtistLinkDto} from "../../../../dto/artist-link-dto/artist-link-dto";

@Component({
  selector: 'add-album-to-featured',
  templateUrl: './add-album-to-featured.component.html',
  styleUrls: ['./add-album-to-featured.component.css']
})
export class AddAlbumToFeaturedComponent implements OnInit {

  artist: ArtistLinkDto = new ArtistLinkDto();
  artistLogin: string;
  errorMessage: string;
  hasArtistBeenFound: boolean;
  hasArtistNotBeenFound: boolean;
  artistAlbums: AlbumLinkDto[] = [];
  @Output() onUpdateListOfFeaturedAlbums = new EventEmitter();

  constructor(private artistService: ArtistServiceService) { }

  ngOnInit() {
  }

  getArtistAlbumsByArtistLogin() {

    this.artistLogin = this.artist.login;
    this.artistService.getArtistAllAlbumsByArtistLogin(this.artistLogin).subscribe(

      data =>{

        this.hasArtistNotBeenFound = false;
        this.artistAlbums = data.body as AlbumLinkDto[];
        this.hasArtistBeenFound = true;
      },
      error1 => {

        if (error1.status == 404){

          this.hasArtistBeenFound = false;
          this.errorMessage = this.artistLogin + " not found";
          this.hasArtistNotBeenFound = true;
        }
      }
    )
  }

  updateListOfFeaturedAlbums() {
    this.onUpdateListOfFeaturedAlbums.emit();
  }

  closeErrorMessage() {
    this.hasArtistNotBeenFound = false;
  }

  closeArtistFoundMessage() {
    this.hasArtistBeenFound = false;
  }
}
