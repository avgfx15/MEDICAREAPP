import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { SellerService } from 'src/app/services/seller.service';
import { UserAuthService } from '../../services/user-auth.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  resData: any;
  allProducts: ProductModel[] = [];
  totalProducts: number = 0;
  totalOrders: number = 0;
  userData: UserModel | undefined;
  constructor(
    private sellerService: SellerService,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit() {
    this.getAllProductsAddedBySellerLoggedIn();
    this.userData = this.userAuthService.getUserData().user;
  }

  //? Get All Product BY SellerLoggedIn And Total No Of Products
  getAllProductsAddedBySellerLoggedIn() {
    this.sellerService.getAllProductsBySellerAdded().subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.totalProducts = 0;
          this.totalOrders = 0;
        }
        this.allProducts = this.resData.Products;

        this.totalProducts = this.resData.Products.length;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
