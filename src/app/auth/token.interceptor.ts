import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService,private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const headers= {
      Authorization: this.auth.getToken()
    }
    request = request.clone({
      setHeaders: headers.Authorization=== '' ? {}:headers
    });
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status){
            case 401:
            case 403:
              this.auth.logout();
              break;

            default: return;
          }
        }
      }));
  }
}
