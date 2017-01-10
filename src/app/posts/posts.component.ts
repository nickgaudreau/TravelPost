import { Component, OnInit } from '@angular/core';
import { IPost } from './IPost';
import { PostServices } from './posts.service';

declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: IPost[];
  errorMessage: string;
  txtLocation: string;

  private _postService: PostServices;

  constructor(postService: PostServices) {
    this._postService = postService;
  }
  
  ngOnInit() {
    this._postService.getAll()
      .subscribe(
      data => { this.posts = data; console.log("data.length: " + data.length); }, // here
      error => this.errorMessage = <any>error // <any> is a cat ops to any data type
      );
  }  
}
