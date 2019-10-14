export class FullTrackInfoDto {

  id: number;
  title: string;
  artistId: number;
  artistLogin: string;
  albumId: number;
  albumTitle: string;
  dateOfRelease: string;
  duration: number;
  genres: string[];
  description: string;
  isFree: boolean;
  price: number;
  numberOfLikes: number;
  audioUrl: string;
  coverPictureUrlName: string;
  size: number;
  inCartOfCurrentVisitor: boolean;
  likedByCurrentVisitor: boolean;


  constructor(id?: number, title?: string, artistId?: number, artistLogin?: string, albumId?: number,
              albumTitle?: string, dateOfRelease?: string, duration?: number, genres?: string[],
              description?: string, isFree?: boolean, price?: number, numberOfLikes?: number, audioUrl?: string,
              coverPictureUrl?: string, size?: number, isInCurrentVisitorCart?: boolean, likedByCurrentVisitor?: boolean) {
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.artistLogin = artistLogin;
    this.albumId = albumId;
    this.albumTitle = albumTitle;
    this.dateOfRelease = dateOfRelease;
    this.duration = duration;
    this.genres = genres;
    this.description = description;
    this.isFree = isFree;
    this.price = price;
    this.numberOfLikes = numberOfLikes;
    this.audioUrl = audioUrl;
    this.coverPictureUrlName = coverPictureUrl;
    this.size = size;
    this.inCartOfCurrentVisitor = isInCurrentVisitorCart;
    this.likedByCurrentVisitor = likedByCurrentVisitor;
  }
}
