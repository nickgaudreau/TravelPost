import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IComment } from './IComment';
import { IPost } from '../posts/IPost';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { CommentsServices } from '../comments/comments.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  title: string = "Leave a Comment: ";
  comments: IComment[];
  errorMessage: string;
  commentSaved : boolean = false;
  private postId : number;
  private postUser : string;
  private subscription: Subscription;

  private _activatedRoute: ActivatedRoute;
  private _commentsServices: CommentsServices;
  private _formBuilder: FormBuilder;

  saveCommentForm: FormGroup;

  

  //@Output() childReadyEvent: EventEmitter<IComment[]> = new EventEmitter();

  constructor(activatedRoute: ActivatedRoute, commentsServices: CommentsServices, formBuilder: FormBuilder) {
    this._activatedRoute = activatedRoute;
    this._commentsServices = commentsServices;
    this._formBuilder = formBuilder;
    
    this.buildForm();
  }

  buildForm() {
    this.saveCommentForm = this._formBuilder.group({
      comment_text: [null, Validators.required]
    })
  }

  ngOnInit() {
    console.log('init child commments');
    // this enough on load
    let id = +this._activatedRoute.snapshot.params['id']; // the + is a JS shortcut to change a string into a number
    console.log("comments ts " + id); // the + is a JS shortcut to change a string into a number)
    this.getCommentsWhere(id);
    this.postId = id;

    let username = this._activatedRoute.snapshot.params['username']; 
    this.postUser = username;

    this.getDate(); // debig
  }

  // TODO listener on success comments added
  ngOnChanges() {
    // observable required on changes... kind of
    console.log("CommentsComponent.ngOnChanges()");
    // this.subscription = this._activatedRoute.params.subscribe(
    //     params => {
    //         let id = +params['id'];
    //         this.getCommentsWhere(id);
    // });  
  }

  getCommentsWhere(id: number) {
    console.log("CommentsComponent.getCommentsWhere()");
    this._commentsServices.getAllWhere(id).subscribe(
      comments => this.comments = comments,
      error => this.errorMessage = <any>error,
      () => { console.log(this.comments); }
    )
  }

  // on submit method
  saveComment(event) {
    console.log(event);
    let txt = this.saveCommentForm.value;
    console.log(txt.comment_text);
    if (this.postId != 0 && this.postUser != null && this.postUser != '') {
      let comment: IComment = {
        id: 0,
        createdDate: new Date().toLocaleDateString(), // server side, but need it here too due to async issue
        text: txt.comment_text,
        username: this.postUser, 
        postId: this.postId
      }
      this._commentsServices.create(comment).subscribe(
        data => { this.onSuccessCommentSaved(data) },
        error => this.errorMessage = <any>error,
        () => { }
      )

    }
    else {
      // display error page or something
      console.error("comments length 0 or null");
      this.commentSaved = false;
    }
  }

  onSuccessCommentSaved(data : IComment){
      if(this.comments == null)
        this.comments = [data]
      else
        this.comments.push(data);
        
      this.commentSaved = true;
      setTimeout(() => this.commentSaved = false, 2000);
  }

  getDate(): string{
    // Number.prototype.padLeft = function (base, chr) {
    //     var len = (String(base || 10).length - String(this).length) + 1;
    //     return len > 0 ? new Array(len).join(chr || '0') + this : this;
    // }
    // var today = new Date();
    // var todayFormatted =
    //     [(today.getMonth() + 1).padLeft(),
    //         (today.getDate()).padLeft(),
    //         today.getFullYear()].join('/');

    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " T "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    console.log(datetime);
    return datetime;
  }

}
