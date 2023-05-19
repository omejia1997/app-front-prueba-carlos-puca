import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements OnInit {

  nameUser:any;

  constructor() { 
    this.nameUser = localStorage.getItem('nameUser');
  }
  

  ngOnInit(): void {
  }

}
