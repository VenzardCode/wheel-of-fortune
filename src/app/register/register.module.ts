import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes:Routes=[
  {
    path:'',
    component:RegisterComponent
  }
]

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule

  ]
})
export class RegisterModule { }
