import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { IPost } from '../posts/IPost';
import { ILocation } from './ILocation';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { PostServices } from '../posts/posts.service';
import { Subscription } from 'rxjs/Subscription';

import { LocationServices } from './location.service';

import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

declare var $: any;

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.css']
})
export class WritePostComponent implements OnInit {
  posts: IPost[];
  errorMessage: string;
  postSaved: boolean = false;

  worldCities: ILocation[];

  private postId: number;
  private postUser: string;
  private subscription: Subscription;

  private _activatedRoute: ActivatedRoute;
  private _postServices: PostServices;
  private _locationServices: LocationServices;
  private _formBuilder: FormBuilder;

  savePostForm: FormGroup;

  //@Output() childReadyEvent: EventEmitter<IPost[]> = new EventEmitter();

  constructor(activatedRoute: ActivatedRoute, postServices: PostServices, locationServices: LocationServices, formBuilder: FormBuilder, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this._activatedRoute = activatedRoute;
    this._postServices = postServices;
    this._locationServices = locationServices;
    this._formBuilder = formBuilder;

    this.buildForm();

    // fix for toast
    this.toastr.setRootViewContainerRef(vRef);
  }

  buildForm() {
    this.savePostForm = this._formBuilder.group({
      post_title: [null, Validators.required],      
      post_mainPic: [],
      post_memo: [null, Validators.required],
      post_location: [null, Validators.required],
      post_text: [] // not needed with summernote - not functional anyway
    })
  }

  ngOnInit() {    
    //let username = this._activatedRoute.snapshot.params['username']; 
    this.postUser = "admin";//username; // for now until have membership pro

    // $ for summernote to load
    $('#summernote-post-main-pic').summernote({toolbar:[['picture', ['picture']]], placeholder:'drag and drop your pic here'}); // empty toolbar for pic drag n drop
    $('#summernote-post-text').summernote(); // text

    // NO NEED PIPE - simply use HTML5 Datalist with inputs below testing filter by title..later will be ILocation object interface
    this._postServices.getAll()
      .subscribe(
      data => { this.posts = data; console.log("data.length: " + data.length); }, // here
      error => this.errorMessage = <any>error // <any> is a cat ops to any data type
      );

    if (typeof (Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      let cities = localStorage.getItem("cities");
      if (cities) {
        try {
          this.worldCities = JSON.parse(cities);
        }
        catch (ex) {
          console.error(ex.name + ', ' + ex.message);
          // if fail...get form service..
          this._locationServices.getAll()
            .subscribe(
            data => { this.worldCities = data; this.setLocalStorage(data); }, // here
            error => this.errorMessage = <any>error // <any> is a cat ops to any data type
            );
        }

      }
      else {
        this._locationServices.getAll()
          .subscribe(
          data => { this.worldCities = data; this.setLocalStorage(data); }, // here
          error => this.errorMessage = <any>error // <any> is a cat ops to any data type
          );
      }
    } else {
      console.error('Sorry! No Web Storage support..');
    }
  }

  // on submit method
  savePost(event) {
    console.log(event);
    let form = this.savePostForm.value;
    if (this.postUser != null && this.postUser != '') {
      let post: IPost = {
        id: 0,
        title: form.post_title,
        mainPic: $('#summernote-post-main-pic').summernote('code'),
        memo: form.post_memo,
        location: form.post_location,
        createdDate: new Date().toLocaleDateString(), // server side, but need it here too due to async issue
        text: $('#summernote-post-text').summernote('code'),
        username: this.postUser
      }
      this._postServices.create(post).subscribe(
        data => { this.onSuccessPostSaved(data) },
        error => this.errorMessage = <any>error,
        () => { }
      )

    }
    else {
      // display error page or something
      console.error("posts length 0 or null");
      this.postSaved = false;
    }
  }

  onSuccessPostSaved(data: IPost) {
    if (this.posts == null)
      this.posts = [data]
    else
      this.posts.push(data);

    let options: ToastOptions = new ToastOptions({
      animate: 'flyRight',
      positionClass: 'toast-bottom-center'
    });
    this.toastr.success('Post added!', 'Success!', options);
    // this.postSaved = true;
    // setTimeout(() => this.postSaved = false, 2000);
  }

  // showSuccess() {
  //       this.toastr.success('You are awesome!', 'Success!');
  //     }

  setLocalStorage(locations: ILocation[]) {
    localStorage.setItem("cities", JSON.stringify(locations));
    console.log("worldCities.length: " + locations.length);
  }

}
