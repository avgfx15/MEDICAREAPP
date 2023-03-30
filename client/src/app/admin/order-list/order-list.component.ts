import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';

const OrderStatus = {
  0: { label: 'Pending', color: 'primary' },
  1: { label: 'Process', color: 'warning' },
  2: { label: 'Shipped', color: 'info' },
  3: { label: 'Delivered', color: 'success' },
  4: { label: 'Failed', color: 'danger' },
};

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  resData: any;
  allOrderList: OrderModel[] = [];
  orderStatus = OrderStatus;
  isPaid: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllOrders();
  }

  // ? GET ALL ORDERS

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.resData = res;

        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = this.resData.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        }
        this.allOrderList = this.resData.AllOrders;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // * Update Order By Order Id

  deleteOrderByOrderId(orderId: string) {
    this.orderService.deleteOrderByOrderId(orderId).subscribe({
      next: (res) => {
        this.resData = res;
        console.log(this.resData);
        this.getAllOrders();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
