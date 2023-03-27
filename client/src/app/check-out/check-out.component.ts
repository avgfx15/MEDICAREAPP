import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailsModel, UserModel } from '../models/user-model';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { OrderModel } from '../models/order-model';
import { OrderItems } from '../models/order-items';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { StripeService } from 'ngx-stripe';
import { UserAuthService } from '../services/user-auth.service';

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
  userData: UserModel | undefined;
  orderItems: OrderItems[] = [];
  userId: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.

    // / Get User Data From Header
    const loggedInUser = this.userAuthService.getUserData();
    this.userId = loggedInUser.user._id;

    this.getUserDataById(this.userId);

    this.getCartItems();
  }

  // ? Backe To Cart Page
  backToCartPage() {
    this.router.navigate(['/cartpage']);
  }

  // ? UserData By UserId

  getUserDataById(userId: string) {
    this.adminService.getUserByUserId(userId).subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.showMsg = this.resData.errorMessage;
        }
        this.userData = this.resData.User;
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
  }

  //+ Place Order Order

  placeNewOrder(userDetailsForm: UserDetailsModel) {
    /// Create Order & shipping Address
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

    /// Store OrderData in Localstorage

    this.orderService.cacheOrderData(order);

    /// Redirect to Stripe Payment Getway API In OrderService file and Get Error if Any

    this.orderService
      .createpaymentCheckoutSession(this.orderItems)
      .subscribe((error) => {
        if (error) {
          console.log('Error in redirect to payment');
        }
      });
  }
}
