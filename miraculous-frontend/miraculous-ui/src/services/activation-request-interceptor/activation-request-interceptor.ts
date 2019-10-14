import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActivationServiceService} from "../activation-service/activation-service.service";
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Injectable} from "@angular/core";



@Injectable()
export class ActivationRequestInterceptor implements HttpInterceptor{

  constructor(private activationService: ActivationServiceService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.params);
    if (req.urlWithParams.includes("activationCode=")){
      console.log("Intercepting");
      if (req.params["activationCode"] != null){
        console.log("Sending activation request")
        this.activationService.activateVisitor(req.params["activationCode"]);
        return next.handle(req);
      }

    }
    return next.handle(req);
  }
}

