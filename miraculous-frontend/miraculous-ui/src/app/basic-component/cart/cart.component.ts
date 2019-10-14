import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TrackLinkDto} from "../../../dto/track-link-dto/track-link-dto";
import {CartServiceService} from "../../../services/cart-service/cart-service.service";
import {TokenStorageServiceService} from "../../../services/token-storage-service/token-storage-service.service";
import {Router} from "@angular/router";
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";
import {AlbumLinkDto} from "../../../dto/album-link-dto/album-link-dto";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  albumsInCart: AlbumLinkDto[] = [];
  tracksInCart: TrackLinkDto[] = [];
  isPayButtonClicked: boolean = false;

  @ViewChild("paymentPanel", {read: ElementRef})
  paymentPanel: ElementRef;

  constructor(private cartService: CartServiceService,
              private tokenService: TokenStorageServiceService,
              private router: Router,
              private siteVisitorService: SiteVisitorServiceService) { }

  ngOnInit() {

    this.getAlbumsInCartByOwnerId();
    this.getTracksInCartByOwnerId();
  }

  getTotalSumOfOrder(tracks: Array<TrackLinkDto>, albums: Array<AlbumLinkDto>): number {
    
    let sumOfTracks: number;
    let sumOfAlbums: number;

    sumOfTracks = tracks.reduce((sum, elem): number => {

      return sum + elem.price;

    }, 0);
    sumOfAlbums = albums.reduce((sum, elem): number => {

      return sum + elem.price;

    }, 0);
    return sumOfAlbums + sumOfTracks;
  }

  goToDiscoverPage(){

    this.router.navigate(["miraculous/discover"]);
  }

  getAlbumsInCartByOwnerId(){

    this.siteVisitorService.getAlbumsInCartByOwnerId(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      data => {

        this.albumsInCart = data.body;

      },
      error1 => {
        console.log(error1.message);
      }
    )
  }

  getTracksInCartByOwnerId(){

    this.siteVisitorService.getTracksInCartByOwnerId(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      data => {

        this.tracksInCart = data.body;

        },
      error1 => {

        console.log(error1.message);
      }
    )
}

  emptyCart() {

    this.cartService.deleteAllFromCart(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

      result => {

        this.getTracksInCartByOwnerId();
        this.getAlbumsInCartByOwnerId();
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }


  hideOtherComponents(){

    document.querySelector(".darkening-overflow").setAttribute("style","display: block");
    document.querySelector(".navigation-panel").setAttribute("style","opacity: 0.5; transition: 2s");
    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: none");

  }

  showOtherComponents(){

    document.querySelector(".darkening-overflow").setAttribute("style","display: none");
    document.querySelector(".navigation-panel").setAttribute("style","opacity: 1; transition: 2s");
    document.querySelector(".basic-component-container").setAttribute("style", "pointer-events: all");
  }

  showPaymentPanel() {

    this.hideOtherComponents();
    this.isPayButtonClicked = true;

  }

  closePaymentPanel() {
    this.isPayButtonClicked = false;
    this.showOtherComponents();
  }

  completeBuy() {

    this.emptyCart();
    window.location.reload();
  }
}


