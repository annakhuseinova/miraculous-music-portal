import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrackLinkDto} from "../../../../dto/track-link-dto/track-link-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {CartServiceService} from "../../../../services/cart-service/cart-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";

@Component({
  selector: 'cart-track',
  templateUrl: './cart-track.component.html',
  styleUrls: ['./cart-track.component.css']
})
export class CartTrackComponent implements OnInit {

  @Input() cartTrack: TrackLinkDto = new TrackLinkDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  @Output() onTrackFromCartDeletion = new EventEmitter();

  constructor(private cartService: CartServiceService, private tokenService: TokenStorageServiceService) { }

  ngOnInit() {
  }

  deleteTrackFromCart() {

    this.cartService.deleteTrackFromCart(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn()),this.cartTrack.id).subscribe(

      result =>{

        this.onTrackFromCartDeletion.emit();

      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
