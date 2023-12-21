import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchValueSubject = new BehaviorSubject<any>('');
  searchValue$: Observable<any> = this.searchValueSubject.asObservable();
  constructor() {}
  updateSearchValue(value: any): void {
    this.searchValueSubject.next(value);
  }
}
