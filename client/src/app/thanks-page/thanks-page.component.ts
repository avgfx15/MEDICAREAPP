import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-thanks-page',
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.css'],
})
export class ThanksPageComponent implements OnInit {
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  constructor(
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const orderData = this.orderService.getCacheOrderData();

    this.orderService.createNewOrder(orderData).subscribe((res) => {
      this.cartService.emptyCart();
      this.orderService.removeCachOrderData();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    });
  }
  // ? Backe To Cart Page
  backToHomePage() {
    this.router.navigate(['/']);
  }

  // this.orderService.createNewOrder(order).subscribe({
  //   next: (res) => {
  //     this.resData = res;
  //     if (this.resData.resStatus === false) {
  //       this.isDisabled = true;
  //       this.showMsg = this.resData.errorMessage;
  //       this.success = false;
  //       setTimeout(() => {
  //         this.isDisabled = false;
  //       }, 3000);
  //     }
  //     this.cartService.emptyCart();
  //     this.router.navigate(['/thanks']);
  //   },
  //   error: (error) => {
  //     console.log(error);
  //   },
  // });
}
