import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentRetrievalDto} from "../../../../dto/comment-retrieval-dto/comment-retrieval-dto";
import {CommentServiceService} from "../../../../services/comment-service/comment-service.service";
import {TokenStorageServiceService} from "../../../../services/token-storage-service/token-storage-service.service";
import {DomainServiceService} from "../../../../services/domain-service/domain-service.service";

@Component({
  selector: 'album-comment',
  templateUrl: './album-comment.component.html',
  styleUrls: ['./album-comment.component.css']
})
export class AlbumCommentComponent implements OnInit {

  @Input() comment = new CommentRetrievalDto();
  @Output() onCommentDeletion = new EventEmitter();
  imagesPath: string = DomainServiceService.PICTURES_PATH;

  constructor(private commentService: CommentServiceService, private tokenStorage: TokenStorageServiceService) { }

  ngOnInit() {
  }

  deleteComment() {

    this.commentService.deleteComment(this.comment.id).subscribe(

      result => {

        this.onCommentDeletion.emit();
      },
      error1 => {

        console.log(error1.message);
      }
    )
  }
}
