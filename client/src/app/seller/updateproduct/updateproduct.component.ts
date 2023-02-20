import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { SellerService } from 'src/app/services/seller.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css'],
})
export class UpdateproductComponent implements OnInit {
  resData: any = [];
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  productDetails: ProductModel | undefined;
  Categories: any;
  constructor(
    private sellerService: SellerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// Get ProductId
    let productId = this.activatedRoute.snapshot.paramMap.get('id');

    productId && this.getProductByProductId(productId);
    this.getAllCategories();
  }

  // * Update ProductBy ProductId By Authentic User

  updateProductBySellerByProductId(updateProductForm: ProductModel) {
    if (this.productDetails) {
      updateProductForm._id = this.productDetails._id;
    }

    this.sellerService
      .updateProductByProductIdByAuthenticUser(updateProductForm)
      .subscribe({
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
          this.isDisabled = true;
          this.success = true;
          this.showMsg = this.resData.successMessage;
          setTimeout(() => {
            this.router.navigate(['/seller/sellerproductlist']);
          }, 3000);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // ? Get ProductBy ProductId

  getProductByProductId(id: string) {
    this.sellerService.getProductByProductId(id).subscribe({
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
        this.productDetails = this.resData.Product;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //? GET AL CATEGORIES

  getAllCategories() {
    this.sellerService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res;
      },
      error: (error) => {
        this.isDisabled = true;
        this.success = false;
        this.showMsg = error;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
    });
  }
}
