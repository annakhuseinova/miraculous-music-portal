export class UserProfileDto {

  id: number;
  login: string;
  email: string;
  dateOfRegistration: string;
  description: string;
  location: string;
  pictureUrlName: string;
  isLikedMusicShown: boolean;


  constructor(id?: number, login?: string, email?: string, dateOfRegistration?: string,
              description?: string, location?: string, pictureUrl?: string, isLikedMusicShown?: boolean) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.dateOfRegistration = dateOfRegistration;
    this.description = description;
    this.location = location;
    this.pictureUrlName = pictureUrl;
    this.isLikedMusicShown = isLikedMusicShown;
  }
}
