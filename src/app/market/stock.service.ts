import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:5148/api/stock';
  private updateInterval = 10000; 

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  updateStockPrices(): Observable<any> {
    return timer(0, this.updateInterval).pipe(
      switchMap(() => {
        return this.http.put(this.apiUrl, null);
      })
    );
  }

  
}
