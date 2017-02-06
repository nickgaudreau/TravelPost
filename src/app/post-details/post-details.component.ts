import { Component, OnInit } from '@angular/core';
import { IPost } from '../posts/IPost';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Subscription } from 'rxjs/Subscription';
import { PostServices } from '../posts/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postTitle: string;
  post: IPost;
  errorMessage: string;
  private subscription: Subscription;

  private _activatedRoute : ActivatedRoute;
  private _router : Router;
  private _postService: PostServices;

  constructor(activatedRoute : ActivatedRoute, router : Router, postService : PostServices){
      this._activatedRoute = activatedRoute;
      this._router = router;
      this._postService = postService;
      //console.log('constructor details');
  }

  ngOnInit() {
    //console.log('init details');
    // snapshot is static and get id from generated page url
    let id = +this._activatedRoute.snapshot.params['id']; // the + is a JS shortcut to change a string into a number 
    this.postTitle = `${id}`;
    // .params use observable, this can be useful if url params change without moving from the page
    this.subscription = this._activatedRoute.params.subscribe(
        params => {
            let id = params['id'];
            this.getPost(id);
            //this.getCommentsWhere(id);
            //this.getPage(id);
    });  
  }

  getPost(id: string) {
      this._postService.getById(id).subscribe(
          post => this.post = post,
          error => this.errorMessage = <any>error, 
          () =>  this.onComplete(id) 
      );
  }

  // concurent call to api
  // getPage(id: number){
  //     Observable.forkJoin(
  //       this._postService.getById(id),
  //       this._commentsServices.getAllWhere(id)
  //   ).subscribe(
  //     data => {
  //       this.post = data[0]; console.log(data[0]);
  //       this.comments_details = data[1]; console.log(data[1]);
  //     },
  //     err => console.error(err)
  //   );
  // }

  onComplete(id: string){
    //console.log('completed method');
    this.postTitle = this.post.title;
  }  

  // parentHandlingFcn(receivedParam: IComment[]) {
  //   console.log("this executes third, with " + receivedParam.length); //string from child
  //   this.comments_details = receivedParam;
  // }

}
