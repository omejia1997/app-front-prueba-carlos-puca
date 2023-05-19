import { Component, OnChanges, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { timeStamp } from 'console';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  typeUser:any;
  esAdmin:any;

  constructor(private router: Router,
    private cookieService:CookieService) {
  }

  ngOnInit(): void {
    this.esAdmin= localStorage.getItem('esAdmin');
  }

  IsLoggedout() {
    localStorage.clear();
    this.cookieService.delete('token', '/', 'localhost', false, 'Lax');
    this.router.navigate(['./login']);
    
  }

}
