import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ResultForm} from "../types/result-form";
import {HttpService} from "./http/http.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUrl: string | null = null;

  constructor(public httpService: HttpService, private router: Router) {
  }

  get rolled() {
    let parsed: number = parseInt(localStorage.getItem('rolled') ?? '-1');
    return isNaN(parsed) ? -1 : parsed;
  }

  public login(res: ResultForm): Observable<boolean> {
    localStorage.setItem('auth', 'true');
    localStorage.setItem('rolled', res.rolled.toString());

    return of(true).pipe(
      tap(() => true)
    );
  }

  public logout(): void {
    this.httpService.logoutRequest().subscribe(res => {

    }, error => {

    })
    localStorage.removeItem('auth');
    this.navigateTo('login');

  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  public navigateTo(path: string): void {
    this.router.navigate([path])
  }
}
