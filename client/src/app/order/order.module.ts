import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class OrderModule {
  constructor(private cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
