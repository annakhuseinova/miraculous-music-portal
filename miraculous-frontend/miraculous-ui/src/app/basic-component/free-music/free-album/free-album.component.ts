import {Component, Input, OnInit} from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {AlbumLikeDto} from "../../../../dto/album-like-dto/album-like-dto";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {AlbumServiceService} from "../../../../services/album-service/album-service.service";

@Component({
  selector: 'free-album',
  templateUrl: './free-album.component.html',
  styleUrls: ['./free-album.component.css']
})
export class FreeAlbumComponent implements OnInit {

  @Input() freeAlbum: AlbumLinkDto = new AlbumLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  albumPageUrl: string = DomainServiceService.ALBUM_PAGE_PATH;
  artistPageUrl: string = DomainServiceService.ARTIST_PROFILE_PATH;

  constructor(private tokenService: TokenStorageServiceService, private albumService: AlbumServiceService) { }

  ngOnInit() {
  }

  putLike() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "To be able to use cart, you need to sign in";
      this.showSignInPanel();

    }else {

      let albumLikeDto: AlbumLikeDto = new AlbumLikeDto();
      albumLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      albumLikeDto.albumId = this.freeAlbum.id;
      this.albumService.putOrRemoveLikeFromAlbum(albumLikeDto).subscribe(

        data => {

          this.freeAlbum.numberOfLikes = data.body.numberOfLikes;
          this.freeAlbum.likedByCurrentVisitor = data.body.albumLikedByCurrentVisitor;
          console.log(data.body);

        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  showSignInPanel() {

    this.showLoginComponent();
  }


  hideOtherComponents(){

    document.querySelector(".darkening-overflow").setAttribute("style","display: block");
    document.querySelector(".navigation-panel").setAttribute("style","opacity: 0.5; transition: 2s");
    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: none");

  }

  showLoginComponent(){

    document.querySelector(".login-component").setAttribute("style", "z-index: 1000000 ;opacity: 1; pointer-events: all; transition: 1s; position: fixed; width: 930px; height: 510px; top:22%");
    this.hideOtherComponents();
  }
}
