export class PlayableTrackDto {

  id: number;
  title: string;
  artistId: number;
  artistLogin: string;
  albumId: number;
  albumTitle: string;
  duration: number;
  numberOfLikes: number;
  coverPictureUrlName: string;
  audioUrlName: string;
  isFree: boolean;
  price: number;
  genres: string[];
  dateOfRelease: string;
  inCartOfCurrentVisitor: boolean;
  likedByCurrentVisitor: boolean;


  constructor(id?: number, title?: string, artistId?: number,
              artistLogin?: string, albumId?: number, albumTitle?: string,
              duration?: number, numberOfLikes?: number, coverPictureUrl?: string, audioUrl?: string,
              isFree?: boolean, price?: number, genres?: string[], dateOfRelease?: string,
              isInCurrentVisitorCart?: boolean, isLikedByCurrentVisitor?: boolean) {
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.artistLogin = artistLogin;
    this.albumId = albumId;
    this.albumTitle = albumTitle;
    this.duration = duration;
    this.numberOfLikes = numberOfLikes;
    this.coverPictureUrlName = coverPictureUrl;
    this.audioUrlName = audioUrl;
    this.isFree = isFree;
    this.price = price;
    this.genres = genres;
    this.dateOfRelease = dateOfRelease;
    this.inCartOfCurrentVisitor = isInCurrentVisitorCart;
    this.likedByCurrentVisitor = isLikedByCurrentVisitor
  }
}

