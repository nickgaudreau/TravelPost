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

  txt: string = "";

  txtLocationParent: any;

  // could use like this in html: [src]='getPath("logo.png")'
  public getPath(img:string): string{
    return this.imgPath + img;
  }

  keyPressed(event, txt):void{
    console.log(event, event.keyCode, event.keyIdentifier);
    this.txtLocationParent = this.txt;
    console.log(this.txt);

    console.log(txt);
  }

}
