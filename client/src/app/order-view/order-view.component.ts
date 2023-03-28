import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from '../models/order-model';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent implements OnInit {
  resData: any;
  orderData: OrderModel | undefined;
  productData: any;
  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    orderId && this.getOrderByOrderId(orderId);
  }

  // ? Get Order By OrderId

  getOrderByOrderId(id: string) {
    this.orderService.getOrderByOrderId(id).subscribe({
      next: (res) => {
        this.resData = res;

        this.orderData = this.resData.Order;

        if (this.orderData) {
          this.productData = this.orderData?.orderItems?.map(
            (orderItem) => orderItem.product
          );
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  backToMyOrdersPage() {}
}
