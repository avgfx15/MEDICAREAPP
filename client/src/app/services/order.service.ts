import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3700/';
  constructor(private httpClient: HttpClient) {}

  // ? GET ALL ORDERS FROM DATABASE

  getAllOrders(): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(this.baseUrl + 'allorders');
  }

  // ? GET ALL ORDERS By Order Id

  getOrderByOrderId(id: string): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(this.baseUrl + 'order/' + `${id}`);
  }

  // + Create Order

  createNewOrder(order: OrderModel): Observable<OrderModel> {
    console.log('Order Service trigger' + order);

    return this.httpClient.post(this.baseUrl + 'neworder', order);
  }
}
