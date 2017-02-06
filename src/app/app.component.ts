import { Component, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { PostsComponent } from './posts/posts.component';

import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Travel Post';
  imgPath:string = "assets/img/";
  navList: string[] = ['Home','Posts', 'Write'];

  txt: string;

  /**
   *
   */
  constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
    // fix for toast
    this.toastr.setRootViewContainerRef(vRef);
    
  }

  year:any = new Date().getFullYear();

  // access child with this decorator
  @ViewChild(PostsComponent) postsChild: PostsComponent;

  ngAfterViewInit() {
    //PostsComponent.setTxtLocation(""); // would call early(bef data is loaded) and cause filter to crash
  }

  // could use like this in html: [src]='getPath("logo.png")'
  public getPath(img:string): string{
    return this.imgPath + img;
  }

  keyPressed(event):void{
    PostsComponent.setTxtLocation(event.target.value);
  }

  loginClicked() {
    this.toastr.info('This site is still in development!', 'Please comeback later.');
  }

}
