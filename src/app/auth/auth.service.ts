import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ResultForm} from "../result-form";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpService: HttpService,private router: Router) {
    this.isAuthenticated()
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(res: ResultForm): Observable<boolean> {
    localStorage.setItem('token', res.token)
    localStorage.setItem('role', res.role)

    if ('expirationTtl' in res) {
      const rez = Date.now() + (res.expirationTtl ?? 0) * 1000;
      localStorage.setItem('tokenExp', rez.toString());
    }
    return of(true).pipe(
      tap(() => true)
    );
  }

  logout(): void {
    this.httpService.logoutRequest().subscribe();
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    this.navigateTo('login');

  }

  public getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  public getRole(): string {
    return localStorage.getItem('role') ?? 'user';
  }
  public getTokenExp(): number {
    return parseInt(localStorage.getItem('tokenExp') ?? '0');
  }

  tokenNotExpired(exp: number): boolean {
    return exp === 0 ? true : (Date.now() < exp);
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    const exp = this.getTokenExp();

    // return a boolean reflecting
    // whether or not the token is expired

    if (!(this.tokenNotExpired(exp))) {
      this.logout()
    }
    return token === '' ? false : this.tokenNotExpired(exp);
  }
  public navigateTo(path: string): void {
    this.router.navigate([path])
  }
}
