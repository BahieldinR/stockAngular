import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  orderForm: FormGroup;
  orders: any[] = [];

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {
    this.orderForm = this.formBuilder.group({
      person: ['', Validators.required],
      stockName: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }
  
  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  onSubmit(): void {
      const orderData = this.orderForm.value;
      this.orderService.createOrder(orderData).subscribe((order) => {
        this.orders.push(order);
        this.orderForm.reset();
        this.getOrders();
      });
    
  }
}
