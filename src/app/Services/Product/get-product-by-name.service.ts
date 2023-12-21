import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../Environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetProductByNameService {
  private BaseUrl: string = '/api/Products/FilterProductByName/';
  constructor(private httpclient: HttpClient) {}
  getproductbyname(ProductName: any): Observable<any> {
    return this.httpclient.get(
      `${env.apirooturl}${this.BaseUrl}${ProductName}`
    );
  }
}
