export class ArtistLinkDto {

  id: number;
  login: string;
  pictureUrlName: string;
  genres: string[];
  totalNumberOfLikes: number;
  numberOfTracks: number;
  numberOfAlbums: number;


  constructor(id?: number,
              login?: string,
              pictureUrl?: string,
              genres?: string[],
              totalNumberOfLikes?: number,
              numberOfTracks?: number,
              numberOfAlbums?: number) {
    this.id = id;
    this.login = login;
    this.pictureUrlName = pictureUrl;
    this.genres = genres;
    this.totalNumberOfLikes = totalNumberOfLikes;
    this.numberOfAlbums = numberOfAlbums;
    this.numberOfTracks = numberOfTracks;
  }
}
