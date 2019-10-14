export class UserSettingsDto {

  id: number;
  email: string;
  description: string;
  location: string;
  coverPictureUrlName: string;
  password: string;
  confirmationPassword: string;


  constructor(id?: number, email?: string,  description?: string, location?: string, coverPictureUrlName?: string,
    password?: string, confirmationPassword?: string) {
    this.id = id;
    this.email = email;
    this.description = description;
    this.location = location;
    this.coverPictureUrlName = coverPictureUrlName;
    this.password = password;
    this.confirmationPassword = confirmationPassword;
  }
}
