import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WheelComponent} from './wheel.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: WheelComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    WheelComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule
  ]
})
export class WheelModule {
}
