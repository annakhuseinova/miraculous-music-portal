import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainServiceService {

  static SERVER_DOMAIN = "http://localhost:8080/miraculous";
  static CLIENT_DOMAIN = "http://localhost:4200/miraculous";
  static PICTURES_PATH = DomainServiceService.SERVER_DOMAIN + "/images/";
  static TRACKS_PATH = DomainServiceService.SERVER_DOMAIN + "/songs/";
  static ARTIST_PROFILE_PATH = DomainServiceService.CLIENT_DOMAIN + "/artists/";
  static USER_PROFILE_PATH = DomainServiceService.CLIENT_DOMAIN + "/users";
  static ALBUM_PAGE_PATH = DomainServiceService.CLIENT_DOMAIN + "/albums/";
  static TRACK_PAGE_PATH = DomainServiceService.CLIENT_DOMAIN + "/tracks/";
  static GENRE_PAGE_PATH = DomainServiceService.CLIENT_DOMAIN + "/genres/";

  constructor() { }
}

