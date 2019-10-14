import { Component, OnInit } from '@angular/core';
import {SiteVisitorServiceService} from "../../../services/site-visitor-service/site-visitor-service.service";
import {SiteVisitorDto} from "../../../dto/site-visitor-dto/site-visitor-dto";

@Component({
  selector: 'users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']
})
export class UsersComponentComponent implements OnInit {

  siteVisitor: SiteVisitorDto = new SiteVisitorDto();
  siteVisitorLogin: string;
  siteVisitorNotFoundMessage: string;
  siteVisitorDeletionSuccessMessage: string;
  siteVisitorDeletionFailureMessage: string;
  hasSiteVisitorBeenFound: boolean;
  hasSiteVisitorNotBeenFound: boolean;
  hasBanBeenSuccessful: boolean;
  hasBanFailed: boolean;

  constructor(private siteVisitorService: SiteVisitorServiceService) { }

  ngOnInit() {
  }


  deleteSiteVisitorById(id: number){

    this.hasSiteVisitorNotBeenFound = false;
    this.hasSiteVisitorBeenFound = false;

    this.siteVisitorService.deleteSiteVisitorById(id).subscribe(

      response => {

        this.hasBanFailed = false;
        this.siteVisitorDeletionSuccessMessage = response.message;
        this.hasBanBeenSuccessful = true;

      },
      error1 => {

        if (error1.status == 404){

          this.hasBanBeenSuccessful = false;
          this.siteVisitorDeletionFailureMessage = error1.body;
          this.hasBanFailed = true;
        }
      }
    )
  }

  getSiteVisitorByLogin(){

    this.hasBanFailed = false;
    this.hasBanBeenSuccessful = false;

    this.siteVisitorService.getSiteVisitorByLogin(this.siteVisitor.login).subscribe(

      response => {

        if (response.status ==  200){

          this.hasSiteVisitorNotBeenFound = false;
          this.siteVisitor = response.body as SiteVisitorDto;
          this.siteVisitorLogin = this.siteVisitor.login;
          this.hasSiteVisitorBeenFound = true;
        }
      },
      error1 => {

        if(error1.status == 404){

          this.hasSiteVisitorBeenFound = false;
          this.siteVisitorNotFoundMessage = this.siteVisitor.login + " not found";
          this.hasSiteVisitorNotBeenFound = true;
        }
      }
    )
  }

  closeSiteVisitorFoundMessage() {

    this.hasSiteVisitorBeenFound = false;
  }

  closeSiteVisitorNotFoundMessage() {

    this.hasSiteVisitorNotBeenFound = false;
  }

  closeSiteVisitorSuccessfullyDeletedMessage() {

    this.hasBanBeenSuccessful = false;
  }

  closeSiteVisitorFailedDeletionMessage() {

    this.hasBanFailed = false;
  }
}
