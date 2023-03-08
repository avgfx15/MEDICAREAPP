import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-search-product-page',
  templateUrl: './search-product-page.component.html',
  styleUrls: ['./search-product-page.component.css'],
})
export class SearchProductPageComponent implements OnInit {
  resData: any
  productDetails: ProductModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private sellerService: SellerService
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const searchQuery =
      this.activatedRoute.snapshot.paramMap.get('searchquery');
    searchQuery && this.searchResult(searchQuery)

  }

  // ? Get Search Result From SerachQuery
  searchResult(searchQuery: any) {

    this.sellerService.searchProductByQuery(searchQuery).subscribe({
      next: (res) => {
        console.log(res);
        this.resData = res
        this.productDetails = this.resData.Products
        console.log(this.productDetails);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart() { }
}
