import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {ActivationServiceService} from "../../../services/activation-service/activation-service.service";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit, OnChanges{

  activationCode: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private activationService: ActivationServiceService) { }

  ngOnInit() {

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (this.activationCode != null){
      this.activationCode = this.activatedRoute.snapshot.params["activationCode"];
      this.activationService.activateVisitor(this.activationCode);
      console.log("sent activation")
    }
    console.log("Is null")

  }

}
