export class VisitorRegistrationDto {

  login: string;
  password: string;
  confirmationPassword: string;
  email: string;
  description: string;
  location: string;
  role: string;


  constructor(login?: string, password?: string, confirmationPassword?: string, email?: string, description?: string,
              location?: string, role?: string) {
    this.login = login;
    this.password = password;
    this.confirmationPassword = confirmationPassword;
    this.email = email;
    this.description = description;
    this.location = location;
    this.role = role;
  }
}
