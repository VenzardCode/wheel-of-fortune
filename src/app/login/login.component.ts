import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {LoginForm} from "./login-form";
import {AuthService} from '../auth/auth.service';
import {ResultForm} from "../result-form";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  LoginForm;
  hide = true;
  message!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public authService: AuthService,private _snackBar: MatSnackBar) {
    this.LoginForm = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
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
    if (this.LoginForm.valid == false) {
      this.openSnackBar('Form not valid')
    } else {
      const body: LoginForm = {
        email: this.LoginForm.value.email,
        password: this.LoginForm.value.password
      };
      this.httpService.loginSubmit(body).subscribe(res => {
        if (res) {

          this.login(res);

        }
      }, error => {
        this.openSnackBar(error.error.error)
      });
    }
  }

  public navigateTo(path: string): void {
    this.router.navigate([path])
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

  logout() {
    this.authService.logout();
  }

}
