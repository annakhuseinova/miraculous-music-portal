export class LikeDto {

  id: number;
  likeGiverId: number;
  dateOfLike: string;


  constructor(id?: number, likeGiverId?: number, dateOfLike?: string) {
    this.id = id;
    this.likeGiverId = likeGiverId;
    this.dateOfLike = dateOfLike;
  }
}
