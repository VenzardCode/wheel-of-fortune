import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  public LoginForm:FormGroup;
  public hide:boolean = true;
  public message!: string;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public httpService: HttpService, private formBuilder: FormBuilder, private router: Router, public authService: AuthService, private _snackBar: MatSnackBar) {
    this.LoginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
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
        login: this.LoginForm.value.login,
        password: this.LoginForm.value.password
      };
      this.httpService.loginSubmit(body).subscribe(res => {
        if (res) {

          this.login(res);

        }
      }, error => {
        this.openSnackBar(error.error.message)
      });
    }
  }
  login(res: ResultForm) {

    this.authService.login(res).subscribe(() => {
      if (this.authService.isAuthenticated()) {
        const redirectUrl:string = '/wheel-of-fortune';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
