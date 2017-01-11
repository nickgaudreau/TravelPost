import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imgPath:string = "assets/img/";

  // could use like this in html: [src]='getPath("logo.png")'
  public getPath(img:string): string{
    return this.imgPath + img;
  }

  constructor() { }

  ngOnInit() {
  }

}
