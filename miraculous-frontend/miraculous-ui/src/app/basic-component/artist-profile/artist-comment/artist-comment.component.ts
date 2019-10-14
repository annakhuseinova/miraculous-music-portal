import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentRetrievalDto} from "../../../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {CommentServiceService} from "../../../../services/comment-service/comment-service.service";

@Component({
  selector: 'artist-comment',
  templateUrl: './artist-comment.component.html',
  styleUrls: ['./artist-comment.component.css']
})
export class ArtistCommentComponent implements OnInit {

  @Input() comment: CommentRetrievalDto = new CommentRetrievalDto();
  imagesPath: string = DomainServiceService.PICTURES_PATH;
  @Output() onCommentDeletion = new EventEmitter();

  constructor(private tokenService: TokenStorageServiceService, private commentService: CommentServiceService) { }

  ngOnInit() {
  }

  deleteComment() {
    this.commentService.deleteComment(this.comment.id).subscribe(

      result => {

        this.onCommentDeletion.emit();

      },error1 => {

        console.log(error1.message);
      }
    )
  }
}
