import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairOrderComponent } from './repair-order.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from "@angular/material/snack-bar";



const routes:Routes=[
  {
    path:'',
    component:RepairOrderComponent,
    canActivate:[AuthGuard]
  }
]
@NgModule({
  declarations: [RepairOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class RepairOrderModule { }
