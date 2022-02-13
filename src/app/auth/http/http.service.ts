import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginForm} from '../../types/login-form';
import {ResultForm} from '../../types/result-form';
import {RollInterface} from "../../types/roll-intrface";


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

  public rollRequest(): Observable<RollInterface> {
    return this.http.get<RollInterface>('/roll');

  }

}
