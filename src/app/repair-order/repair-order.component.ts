import { Component } from '@angular/core';
import {RepairForm} from './form-repair'
import {HttpService} from "../http.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
@Component({
  selector: 'app-repair-order',
  templateUrl: './repair-order.component.html',
  styleUrls: ['./repair-order.component.css']
})
export class RepairOrderComponent {
  RepairForm;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public httpService: HttpService, private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {
    this.RepairForm = this.formBuilder.group({
      item: ['',[Validators.required]],
      defect: ['',[Validators.required]]
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message,'',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }
  onSubmit() {
    if (this.RepairForm.valid == false) {
      this.openSnackBar('Form not valid')
    } else {
      const body: RepairForm = {
        item: this.RepairForm.value.item,
        defect: this.RepairForm.value.defect
      };
      this.httpService.repairOrderSubmit(body).subscribe(res => {
      }, error => {
        this.openSnackBar(error.error.error)
      });
    }
  }

}
