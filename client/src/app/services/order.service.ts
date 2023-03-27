import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { OrderModel } from '../models/order-model';
import { OrderItems } from '../models/order-items';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:3700/';
  constructor(
    private httpClient: HttpClient,
    private stripeService: StripeService
  ) {}

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

  // + CREACT PAYMENT CHECKOUT SESSION

  createpaymentCheckoutSession(orderItem: OrderItems[]) {
    return this.httpClient
      .post(this.baseUrl + 'checkoutpayment', orderItem)
      .pipe(
        switchMap((session: any) => {
          return this.stripeService.redirectToCheckout({
            sessionId: session.id,
          });
        })
      );
  }

  // ? CACHEORDERDATA IN LOCALSTORAGE

  cacheOrderData(order: OrderModel) {
    localStorage.setItem('orderData', JSON.stringify(order));
  }

  // ? Get CacheOrderData From localstorage

  getCacheOrderData(): OrderModel {
    return JSON.parse(localStorage.getItem('orderData')!);
  }

  // - Remove CacheOrderData from localstorage
  removeCachOrderData() {
    localStorage.removeItem('orderData');
  }
}
