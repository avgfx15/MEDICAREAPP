import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { SellerService } from 'src/app/services/seller.service';

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
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// Get ProductId
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    productId && this.getProductByProductId(productId);
    this.getAllCategories();
  }
  updateProductBySellerByProductId(updateProductForm: ProductModel) {
    console.log(updateProductForm);
  }
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
        this.isDisabled = true;
        this.success = true;
        this.showMsg = this.resData.successMessage;
        this.productDetails = this.resData.Product;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ///GET AL CATEGORIES

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
