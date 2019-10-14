export class AlbumLinkDto {

  id: number;
  title: string;
  artistId: number;
  artistLogin: string;
  numberOfTracks: number;
  numberOfLikes: number;
  genres: string[];
  albumCoverPictureUrlName: string;
  dateOfRelease: string;
  isFree: boolean;
  price: number;
  inCartOfCurrentVisitor: boolean;
  likedByCurrentVisitor: boolean;


  constructor(id?: number, title?: string, artistId?: number, artistLogin?: string,
              numberOfTracks?: number, numberOfLikes?: number, genres?: string[],
              albumCoverPictureUrl?: string, dateOfRelease?: string, isFree?: boolean, price?:number,
              isInCartOfCurrentVisitor?: boolean,
              isAlbumLikedByCurrentVisitor?: boolean) {
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.artistLogin = artistLogin;
    this.numberOfTracks = numberOfTracks;
    this.numberOfLikes = numberOfLikes;
    this.genres = genres;
    this.albumCoverPictureUrlName = albumCoverPictureUrl;
    this.dateOfRelease = dateOfRelease;
    this.isFree = isFree;
    this.price = price;
    this.inCartOfCurrentVisitor = isInCartOfCurrentVisitor;
    this.likedByCurrentVisitor = isInCartOfCurrentVisitor;
  }
}
