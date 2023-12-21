import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../Environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  private BaseUrl: string = '/api/Products/Delete/';
  constructor(private httpclient: HttpClient) {}
  removeproduct(productId: number): Observable<any> {
    return this.httpclient.delete(
      `${env.apirooturl}${this.BaseUrl}${productId}`
    );
  }
}
