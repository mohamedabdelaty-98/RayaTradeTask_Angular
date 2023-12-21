import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../Environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  private BaseUrl: string = '/api/Products/GetAll';
  constructor(private httpclient: HttpClient) {}
  getallproducts(): Observable<any> {
    return this.httpclient.get(`${env.apirooturl}${this.BaseUrl}`);
  }
}
