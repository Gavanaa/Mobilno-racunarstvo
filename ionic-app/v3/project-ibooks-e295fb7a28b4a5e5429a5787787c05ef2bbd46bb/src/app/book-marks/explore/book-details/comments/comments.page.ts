import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  commentField = new FormControl('');
  @Output() sendComment = new EventEmitter<string>();
  @Input() comments: { user: string; comment: string }[];
  constructor() {}

  ngOnInit() {}

  postComment() {
    if (this.commentField.invalid) return;
    this.sendComment.emit(this.commentField.value);
    this.commentField.setValue('');
  }
}
