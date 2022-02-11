import {Component} from '@angular/core';
import {HttpService} from "../http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterForm} from "./register-form";
import {ResultForm} from "../result-form";
import {AuthService} from '../auth/auth.service';
import {MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;
  RegisterForm: FormGroup;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder, private router: Router,private authService: AuthService,private _snackBar: MatSnackBar) {
    this.RegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]{8,255}$/)]],
      phone: ['', [Validators.required,  Validators.pattern(/^([- _():=+]?\d[- _():=+]?){7,11}(\s*)?$/)]]
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
    if (!this.RegisterForm.valid) {
      this.openSnackBar('Form not valid')
    } else {
      const body: RegisterForm = {
        name: this.RegisterForm.value.name,
        email: this.RegisterForm.value.email,
        password: this.RegisterForm.value.password,
        phone:'+380'+this.RegisterForm.value.phone
      };
      this.httpService.registerSubmit(body).subscribe(res => {
        if (res) {
          this.login(res);

        }
      }, error => {
        this.openSnackBar(error.error.error)
      });
    }
  }

  login(res:ResultForm) {

    this.authService.login(res).subscribe(() => {
      if (this.authService.isAuthenticated()) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/profile';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }
  public navigateTo(path: string): void {
    this.router.navigate([path])
  }


}
