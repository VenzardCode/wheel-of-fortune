import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import {UnauthGuard} from "./auth/unauth.guard";
import {MatSnackBarModule} from '@angular/material/snack-bar';


const routes: Routes=[
  {
    path:'',
    redirectTo:'main',
    pathMatch:'full'

  },
  {
    path:'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [UnauthGuard],

  },
  {
    path:'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [UnauthGuard],

  },
  {
    path:'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path:'repair-order',
    loadChildren: () => import('./repair-order/repair-order.module').then(m => m.RepairOrderModule),
    canActivate: [AuthGuard],
  },
  {
    path:'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),

  },
  {
    path:'**',
    redirectTo:'main',
    pathMatch:'full'

  }
]

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
