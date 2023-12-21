import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../Environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetByIdService {
  private BaseUrl: string = '/api/Products/GetById/';
  constructor(private httpclient: HttpClient) {}
  getproductbyid(productid: number): Observable<any> {
    return this.httpclient.get(`${env.apirooturl}${this.BaseUrl}${productid}`);
  }
}
