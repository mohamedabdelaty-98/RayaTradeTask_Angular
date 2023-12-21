import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../Environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GetProductByPriceService {
  private BaseUrl: string = '/api/Products/FilterProductByPrice/';
  constructor(private httpclient: HttpClient) {}
  getproductbyprice(ProductPrice: number): Observable<any> {
    return this.httpclient.get(
      `${env.apirooturl}${this.BaseUrl}${ProductPrice}`
    );
  }
}
