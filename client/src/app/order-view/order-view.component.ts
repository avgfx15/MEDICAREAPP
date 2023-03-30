import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from '../models/order-model';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css'],
})
export class OrderViewComponent implements OnInit {
  resData: any;
  orderData: OrderModel | undefined;
  productData: any;
  orderedQty: any;
  isAdmin: boolean = true;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const userRole = this.userAuthService.getRole();
    if (userRole === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

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

  backToMyOrdersPage() {
    this.router.navigate(['/myorder']);
  }
  backToOrderList() {
    this.router.navigate(['/admin/orderlist']);
  }
}
