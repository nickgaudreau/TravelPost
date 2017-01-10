import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = 'Welcome to Ng 2 Simple Blog';
  description: string = 'This is a testing application to put together Angualr 2, .NET REST web api, Entity Framework with SqlLite and Bootstrap';
  constructor() { }

  ngOnInit() {
  }

}
