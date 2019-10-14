import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PaymentServiceService} from "../../../../services/payment-service/payment-service.service";
import {SiteVisitorServiceService} from "../../../../services/site-visitor-service/site-visitor-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";

@Component({
  selector: 'payment-panel',
  templateUrl: './payment-panel.component.html',
  styleUrls: ['./payment-panel.component.css']
})
export class PaymentPanelComponent implements OnInit, AfterViewInit {

  @Input() totalSum: number;
  @Output() onClosedPaymentPanel = new EventEmitter();
  @Output() onSuccessfulAddingMusicToPurchased = new EventEmitter();

  @ViewChild("panel")
  panel: ElementRef;

  @ViewChild("creditCartNumberInput")
  creditCardNumberInput: ElementRef;

  @ViewChild("expirationMonthInput")
  expirationMonthInput: ElementRef;

  @ViewChild("expirationYearInput")
  expirationYearInput: ElementRef;

  @ViewChild("cvcInput")
  cvcInput: ElementRef;

  constructor(private paymentService: PaymentServiceService,
              private siteVisitorService: SiteVisitorServiceService,
              private tokenService: TokenStorageServiceService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.panel.nativeElement.style = "pointer-events: all";
  }

  closePaymentPanel() {
    this.onClosedPaymentPanel.emit();
  }

  chargeCreditCard() {

    (<any>window).Stripe.card.createToken({
      number: this.creditCardNumberInput.nativeElement.value,
      exp_month: this.expirationMonthInput.nativeElement.value,
      exp_year: this.expirationYearInput.nativeElement.value,
      cvc: this.cvcInput.nativeElement.value

    },(status: number, response: any)=> {

      if (status === 200){

        let token = response.id;
        console.log(this.totalSum);
        this.paymentService.chargeCard(token, this.totalSum).subscribe(

          response => {

            this.siteVisitorService.transferTracksAndAlbumsToPurchased(this.tokenService.getVisitorId(this.tokenService.isRememberMeModeOn())).subscribe(

              response => {

                this.closePaymentPanel();
                this.onSuccessfulAddingMusicToPurchased.emit();
              },
              error1 => {

                console.log(error1.message);
              }
            )

          },error1 => {

            console.log(error1.message);
          }
        )
      }else {

        console.log(response.error.message);
      }
      }
      );
  }
}
