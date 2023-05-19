import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { CreateRol } from './pages/rol/create-rol/create-rol.component';
import { ListRolComponent } from './pages/rol/list-rol/lista-rol.component';
import { UpdateRolComponent } from './pages/rol/update-rol/update-rol.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ListRolComponent,
    CreateRol,
    UpdateRolComponent,
    ListUserComponent,
    CreateUserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
