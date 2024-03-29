import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product';
import { UserModel } from 'src/app/models/user-model';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.component.html',
  styleUrls: ['./sellerproductlist.component.css'],
})
export class SellerproductlistComponent {
  resData: any = [];
  allProductList: ProductModel[] = [];
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: any = '';
  sellerDetails: UserModel | undefined;
  constructor(
    private sellerService: SellerService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// Reload All Product List on Visit the Page
    this.getAllProductList();
  }

  /// Get All Products List
  getAllProductList() {
    this.sellerService.getAllProductsBySellerAdded().subscribe({
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
          this.allProductList = this.resData.Products;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /// Delete Product By Id
  deleteProduct(id: string) {
    this.sellerService.deleteProductById(id).subscribe({
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
        this.getAllProductList();
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
