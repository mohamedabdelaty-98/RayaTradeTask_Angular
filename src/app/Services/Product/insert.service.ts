import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../Environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class InsertService {
  private BaseUrl: string = '/api/Products/Insert/';
  constructor(private httpclient: HttpClient) {}
  insertproduct(ProductData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpclient.post(
      `${env.apirooturl}${this.BaseUrl}`,
      ProductData,
      httpOptions
    );
  }
}
