import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from './stock';
import { StockService } from './stock.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';    

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  stocks: Stock[] = [];
  private subscription: Subscription | undefined;

  constructor(private stockService: StockService, public router: Router) { }

  ngOnInit(): void {
    this.getStocks();
    this.startPriceUpdateTimer();
  }

  
  getStocks(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
   
    });
  }

  startPriceUpdateTimer(): void {
    this.subscription = interval(10000) 
      .pipe(switchMap(() => this.stockService.updateStockPrices()))
      .subscribe(() => {
        // Update the prices by calling getStocks() again
        this.getStocks();
      });


}
}
