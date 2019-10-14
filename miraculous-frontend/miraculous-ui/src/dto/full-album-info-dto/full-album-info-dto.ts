export class FullAlbumInfoDto {

    id: number;
    title: string;
    artistId: number;
    artistLogin: string;
    dateOfRelease: string;
    numberOfTracks: number;
    albumDuration: number;
    genres: string[];
    description: string;
    isFree: boolean;
    price: number;
    numberOfLikes: number;
    coverPictureUrlName: string;
    size: number;
    inCartOfCurrentVisitor: boolean;
    likedByCurrentVisitor: boolean;


  constructor(id?: number, title?: string, artistId?: number, artistLogin?: string, dateOfRelease?: string,
              numberOfTracks?: number, albumDuration?: number, genres?: string[], description?: string,
              isFree?: boolean, price?: number,
              numberOfLikes?: number,
              coverPictureUrl?: string,
              size?: number,
              isInCurrentVisitorCart?: boolean,
              isLikedByCurrentVisitor?: boolean) {

    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.artistLogin = artistLogin;
    this.dateOfRelease = dateOfRelease;
    this.numberOfTracks = numberOfTracks;
    this.albumDuration = albumDuration;
    this.genres = genres;
    this.description = description;
    this.isFree = isFree;
    this.price = price;
    this.numberOfLikes = numberOfLikes;
    this.coverPictureUrlName = coverPictureUrl;
    this.size = size;
    this.inCartOfCurrentVisitor = isInCurrentVisitorCart;
    this.likedByCurrentVisitor = isLikedByCurrentVisitor;
  }
}
