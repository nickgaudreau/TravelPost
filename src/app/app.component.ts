import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel Post';
  imgPath:string = "assets/img/";
  navList: string[] = ['Home','Posts', 'Write'];

  // could use like this in html: [src]='getPath("logo.png")'
  public getPath(img:string): string{
    return this.imgPath + img;
  }
}
