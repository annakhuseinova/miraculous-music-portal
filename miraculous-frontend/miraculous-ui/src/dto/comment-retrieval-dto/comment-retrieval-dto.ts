export class CommentRetrievalDto {

  id: number;
  authorId: number;
  authorLogin:string;
  dateOfComment: string;
  role: string;
  text: string;
  numberOfLikes: number;
  commentAuthorPictureUrlName: string;


  constructor(id?: number, authorId?: number, authorLogin?: string, dateOfComment?: string, role?: string, text?: string,
              numberOfLikes?: number, commentAuthorPictureUrlName?: string) {

    this.id = id;
    this.authorId = authorId;
    this.authorLogin = authorLogin;
    this.dateOfComment = dateOfComment;
    this.role = role;
    this.text = text;
    this.numberOfLikes = numberOfLikes;
    this.commentAuthorPictureUrlName = commentAuthorPictureUrlName;
  }
}
