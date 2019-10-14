import { Injectable } from '@angular/core';
import {DomainServiceService} from "../domain-service/domain-service.service";
import {Observable} from "rxjs";
import {UserProfileDto} from "../../dto/user-profile-dto/user-profile-dto";
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {UserSettingsDto} from "../../dto/user-settings-dto/user-settings-dto";
import {GenreDto} from "../../dto/genre-dto/genre-dto";


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUsersApi: string  = DomainServiceService.SERVER_DOMAIN+ "/users/";
  numberOfRegisteredUsersApi: string = this.baseUsersApi + "number";
  userSettingApi: string = "settings";
  userImagesApi: string = "/images"

  constructor(private httpClient: HttpClient) { }

  updateUserSettings(userSettingsDto: UserSettingsDto, coverPictureFile: File, userFavouriteGenres: GenreDto[]): Observable<HttpEvent<any>>{

    let formData = new FormData();
    formData.append("userFavouriteGenres", new Blob([JSON.stringify(userFavouriteGenres)], {type: "application/json"}));
    formData.append("userSettingsDto", new Blob([JSON.stringify(userSettingsDto)], {type: "application/json"}));
    formData.append("coverPictureFile", coverPictureFile);

    let postRequest = new HttpRequest("POST", this.baseUsersApi + this.userSettingApi, formData,
      {reportProgress: true, responseType: "text"} );

    return this.httpClient.request(postRequest);

  }

  deleteUserPhoto(imageUrl: string, userId: number): Observable<HttpResponse<any>>{

    return this.httpClient.delete<HttpResponse<any>>(this.baseUsersApi + userId + this.userImagesApi + "/" + imageUrl);
  }

  getUserSettingsDto(userId: number):Observable<HttpResponse<UserSettingsDto>>{

    return this.httpClient.get<UserSettingsDto>(this.baseUsersApi + userId + "/" + this.userSettingApi,{observe: "response"});
  }

  getNumberOfRegisteredUsers(): Observable<number>{
    return this.httpClient.get<number>(this.numberOfRegisteredUsersApi);
  }


  getUserProfileDto(userId: number): Observable<UserProfileDto>{

    return this.httpClient.get<UserProfileDto>(this.baseUsersApi + userId);
  }

}
