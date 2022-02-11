import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {LoginForm} from './login/login-form';
import {RegisterForm} from './register/register-form';
import {ResultForm} from './result-form';
import {RepairForm} from './repair-order/form-repair';
import {UserInterface} from "./auth/user-interface";
import {MyOrders} from "./profile/my-orders";
import {OrdersInfo} from "./profile/orders-info";
import {Orders} from "./profile/orders";
import {RepairFinishForm} from "./modal/repair-finish-form";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }
  public loginSubmit(form:LoginForm): Observable<ResultForm> {
    return this.http.post<ResultForm>('https://repair.firlin123.workers.dev/api/login', form);

  }
  public registerSubmit(form:RegisterForm): Observable<ResultForm> {
    return this.http.post<ResultForm>('https://repair.firlin123.workers.dev/api/register', form);

  }
  public  meRequest():Observable<UserInterface>{
    return  this.http.get<UserInterface>('https://repair.firlin123.workers.dev/api/me');
  }
  public  logoutRequest():Observable<string>{
    return  this.http.get<string>('https://repair.firlin123.workers.dev/api/logout');
  }
  public repairOrderSubmit(form:RepairForm):Observable<string>{
    return this.http.post<string>('https://production.repair.firlin123.workers.dev/api/newOrder', form);
  }
  public getOrders(): Observable<any>{
    return this.http.get<Orders>('https://production.repair.firlin123.workers.dev/api/myOrders');
  }
  public getNewOrders(): Observable<any>{
    return this.http.get<OrdersInfo>('https://production.repair.firlin123.workers.dev/api/worker/orders');
  }
  public repairOrderFinishSubmit(form:RepairFinishForm):Observable<string>{
    return this.http.post<string>('https://production.repair.firlin123.workers.dev/api/worker/orderDone', form);
  }
  public getOrderSubmit(id:number):Observable<MyOrders>{
    return this.http.post<MyOrders>('https://production.repair.firlin123.workers.dev/api/worker/orderAccept', id);
  }
}
