import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-allproductlist',
  templateUrl: './allproductlist.component.html',
  styleUrls: ['./allproductlist.component.css'],
})
export class AllproductlistComponent {
  resData: any = [];
  allProductList: ProductModel[] = [];
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: any = '';
  constructor(private sellerService: SellerService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// Reload All Product List on Visit the Page
    this.getAllProductList();
  }

  /// Get All Products List
  getAllProductList() {
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
          this.allProductList = this.resData.Products;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
