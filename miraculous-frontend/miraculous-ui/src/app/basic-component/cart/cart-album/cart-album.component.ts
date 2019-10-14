import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlbumLinkDto} from "../../../../dto/album-link-dto/album-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";

@Component({
  selector: 'cart-album',
  templateUrl: './cart-album.component.html',
  styleUrls: ['./cart-album.component.css']
})
export class CartAlbumComponent implements OnInit {

  @Input() cartAlbum: AlbumLinkDto = new AlbumLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  @Output() onAlbumFromCartDeletion = new EventEmitter();

  constructor(private cartService: CartServiceService, private tokenService: TokenStorageServiceService) { }

  ngOnInit() {
  }

  deleteAlbumFromCart() {

    this.cartService.deleteAlbumFromCart(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()),this.cartAlbum.id).subscribe(

       result => {

         this.onAlbumFromCartDeletion.emit();

       },
      error1 => {

         console.log(error1.message);
      }
    )
  }
}
