export class TrackLinkDto {

  id: number;
  title: string;
  artistId: number;
  artistLogin: string;
  albumId: number;
  albumTitle: string;
  duration: number;
  numberOfLikes: number;
  coverPictureUrlName: string;
  isFree: boolean;
  genres: string[];
  price: number;
  inCartOfCurrentVisitor: boolean;


  constructor(id?: number, title?: string, artistId?: number, artistLogin?: string, albumId?: number, albumTitle?: string,
              duration?: number, numberOfLikes?: number, coverPictureUrl?: string, isFree?: boolean, genres?: string[],
              price?: number, inCartOfCurrentVisitor? :boolean) {
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.artistLogin = artistLogin;
    this.albumId = albumId;
    this.albumTitle = albumTitle;
    this.duration = duration;
    this.numberOfLikes = numberOfLikes;
    this.coverPictureUrlName = coverPictureUrl;
    this.isFree = isFree;
    this.genres = genres;
    this.price = price;
    this.inCartOfCurrentVisitor = inCartOfCurrentVisitor;
  }
}
