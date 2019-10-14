import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {AlbumServiceService} from "../../../../services/album-service/album-service.service";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";
import {AlbumCartDto} from "../../../../dto/album-cart-dto/album-cart-dto";
import {AlbumLikeDto} from "../../../../dto/album-like-dto/album-like-dto";

@Component({
  selector: 'artist-album',
  templateUrl: './artist-album.component.html',
  styleUrls: ['./artist-album.component.css']
})
export class ArtistAlbumComponent implements OnInit {

  @Input() album: AlbumLinkDto = new AlbumLinkDto();
  albumPageUrl: string = DomainServiceService.ALBUM_PAGE_PATH;
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  @Output() onUnauthorizedLikeOrAdditionToCart = new EventEmitter();

  constructor(private tokenService: TokenStorageServiceService,
              private albumService: AlbumServiceService,
              private cartService: CartServiceService) { }

  ngOnInit() {
  }

  addToCart() {

    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){

      document.querySelector(".login-message").innerHTML = "In order to use cart, please, sign in";
      this.onUnauthorizedLikeOrAdditionToCart.emit();
    }else {


      let albumCartDto: AlbumCartDto = new AlbumCartDto();
      albumCartDto.albumId = this.album.id;
      albumCartDto.visitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      this.cartService.putOrRemoveAlbumFromCart(albumCartDto).subscribe(

        data => {

          this.album.inCartOfCurrentVisitor = data.body.inCartOfCurrentVisitor;

        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }

  putLike() {
    if (this.tokenService.getToken(this.tokenService.isRememberMeModeOn()) == null){
      document.querySelector(".login-message").innerHTML = "In order to like music, please, sign in";
      this.onUnauthorizedLikeOrAdditionToCart.emit();
    }else {

      let albumLikeDto: AlbumLikeDto = new AlbumLikeDto();
      albumLikeDto.siteVisitorId = this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn());
      albumLikeDto.albumId = this.album.id;
      this.albumService.putOrRemoveLikeFromAlbum(albumLikeDto).subscribe(

        data => {

          this.album.numberOfLikes = data.body.numberOfLikes;
          this.album.likedByCurrentVisitor = data.body.albumLikedByCurrentVisitor;
          console.log(this.album.likedByCurrentVisitor);

        },
        error1 => {

          console.log(error1.message);
        }
      )
    }
  }
}
