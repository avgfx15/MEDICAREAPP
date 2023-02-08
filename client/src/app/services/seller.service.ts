import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  /// Variables Declaration

  baseUrl = 'http://localhost:3700/addcategory';
  constructor(private httpClient: HttpClient) {
    /* TODO document why this constructor is empty */
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /// Add Category Api Service
  addCategory(category: CategoryModel) {
    return this.httpClient.post(this.baseUrl, category, this.httpOptions);
  }

  /// Add New Product Api Service

  addNewProduct(productData: ProductModel) {
    return this.httpClient.post(this.baseUrl, productData, this.httpOptions);
  }
}
