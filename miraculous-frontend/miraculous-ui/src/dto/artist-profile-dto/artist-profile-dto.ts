export class ArtistProfileDto {

  id: number;
  login: string;
  dateOfRegistration: string;
  genres: string[];
  description: string;
  location: string;
  pictureUrlName: string;
  totalNumberOfLikes: number;
  areCommentsAllowed: boolean;


  constructor(id?: number, login?: string, dateOfRegistration?: string, genres?: string[], description?:
    string, location?: string, pictureUrlName?: string, totalNumberOfLikes?: number, areCommentsAllowed?: boolean) {
    this.id = id;
    this.login = login;
    this.dateOfRegistration = dateOfRegistration;
    this.genres = genres;
    this.description = description;
    this.location = location;
    this.pictureUrlName = pictureUrlName;
    this.totalNumberOfLikes = totalNumberOfLikes;
    this.areCommentsAllowed = areCommentsAllowed;
  }
}
