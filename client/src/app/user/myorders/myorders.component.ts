import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order-model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  resData: any;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  allOrderList: OrderModel[] = [];
  orderData: OrderModel | undefined;
  singleOrderData: OrderModel | undefined;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllOrderPlacedByUser();
  }

  // ? Get All Order Placed By User By UserId

  getAllOrderPlacedByUser() {
    this.orderService.getAllOrderPlacedByLoggedInUser().subscribe({
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

  // ? Get Order Details By OrderId
  getOrderDetails(id: string) {
    this.orderService.getOrderByOrderId(id).subscribe({
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
        this.orderData = this.resData.Order;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // - Delete Order By Order Id
  deleteOrderByOrderId(id: string) {
    this.orderService.deleteOrderByOrderId(id).subscribe({
      next: (res) => {
        this.resData = res;
        this.getAllOrderPlacedByUser();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
