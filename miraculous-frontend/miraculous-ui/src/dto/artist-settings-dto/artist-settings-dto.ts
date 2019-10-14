export class ArtistSettingsDto {

  id: number;
  email: string;
  password: string;
  confirmationPassword: string;
  description: string;
  location: string;
  pictureUrlName: string;
  areCommentsAllowed: boolean;



  constructor(id?: number, email?: string, password?: string, confirmationPassword?: string,
              description?: string, location?: string, pictureUrlName?: string, areCommentsAllowed?: boolean) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.confirmationPassword = confirmationPassword;
    this.description = description;
    this.location = location;
    this.pictureUrlName = pictureUrlName;
    this.areCommentsAllowed = areCommentsAllowed;
  }
}
