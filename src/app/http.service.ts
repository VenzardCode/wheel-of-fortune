import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginForm} from './login/login-form';
import {ResultForm} from './result-form';
import {RollIntrface} from "./wheel/roll-intrface";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public loginSubmit(form: LoginForm): Observable<ResultForm> {
    return this.http.post<ResultForm>('/auth/login', form);

  }

  public logoutRequest(): Observable<string> {
    return this.http.get<string>('/auth/logout');
  }

  public rollRequest(): Observable<RollIntrface> {
    return this.http.get<RollIntrface>('/roll');

  }

}
