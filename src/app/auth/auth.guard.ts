import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated() && state.url !== '/login') {

      this.router.navigate(['/login']);
      return false;
    } else {
      if (this.authService.isAuthenticated() && state.url === '/login') {
        this.router.navigate(['/wheel-of-fortune']);

        return false;
      }
      return true
    }


  }
}

