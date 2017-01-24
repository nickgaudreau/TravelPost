import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PostsComponent } from './posts/posts.component'

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

}
