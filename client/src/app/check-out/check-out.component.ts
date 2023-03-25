import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsModel, UserModel } from '../models/user-model';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { OrderModel } from '../models/order-model';
import { OrderItems } from '../models/order-items';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  resData: any;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  changeToSeller: boolean = false;
  isSubmitted: boolean = false;
  userModel: UserModel | undefined;
  orderItems: OrderItems[] = [];
  userId: UserModel | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.getCartItems();
  }

  // ? Backe To Cart Page
  backToCartPage() {
    this.router.navigate(['/cartpage']);
  }

  // ? UserData By UserId

  getUserDataById(id: string) {
    this.adminService.getUserByUserId(id).subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.showMsg = this.resData.errorMessage;
        }
        this.userModel = this.resData.User;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // ? Get Cart Items
  getCartItems() {
    const cart = this.cartService.getCartData();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        orderQty: item.orderQty,
      };
    });
    console.log(this.orderItems);
  }

  //+ Place Order Order

  placeNewOrder(userDetailsForm: UserDetailsModel) {
    const order: OrderModel = {
      orderItems: this.orderItems,
      shippingAddress1: userDetailsForm.street,
      shippingAddress2: userDetailsForm.location,
      city: userDetailsForm.city,
      zipcode: userDetailsForm.zipcode,
      country: userDetailsForm.country,
      user: this.userId,
      isPaid: false,
      paidAt: userDetailsForm.street,
      orderDate: `${Date.now()}`,
      isDelivered: false,
      // totalPrice: userDetailsForm.totalPrice,
      // deliveredAt?: string;
      // paymentMethod?: string;
    };

    this.orderService.createNewOrder(order).subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.showMsg = this.resData.errorMessage;
          this.success = false;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        }
        this.cartService.emptyCart();
        this.router.navigate(['/thanks']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // ? UserSignUpForm
}
