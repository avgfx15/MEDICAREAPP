import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product';
import { SellerService } from '../services/seller.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() isReadMore: boolean = false;
  isCollapsed: boolean = true;
  isTextMoreThen: boolean = false;
  productDescription: string = '';

  resData: any = [];
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  allProducts: ProductModel[] = [];

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {
    /* TODO document why this constructor is empty */
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }

  getAllProducts() {
    this.sellerService.getAllProducts().subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = this.resData.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          this.allProducts = this.resData.Products;
          this.userAuthService.setAllProductInLocalStorage(
            this.resData.Products
          );
        }
      },
      error: (error) => {
        this.isDisabled = true;
        this.success = false;
        this.showMsg = this.resData.errorMessage || error;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
    });
  }

  /// Navigate to Product Detail Page
  navigateToProductDetail(id: string) {
    return this.router.navigate(['productdetail']);
  }
}
