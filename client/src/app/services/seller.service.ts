import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  /// Variables Declaration

  baseUrl = 'http://localhost:3700/';
  constructor(private httpClient: HttpClient) {
    /* TODO document why this constructor is empty */
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /// Add Category Api Service
  addCategory(category: CategoryModel) {
    return this.httpClient.post(
      this.baseUrl + 'addcategory',
      category,
      this.httpOptions
    );
  }

  /// GET ALL Categories

  getAllCategories() {
    return this.httpClient.get(this.baseUrl + 'allcategories');
  }

  /// Add New Product Api Service

  addNewProduct(productData: ProductModel) {
    return this.httpClient.post(
      this.baseUrl + 'addnewproduct',
      productData,
      this.httpOptions
    );
  }

  ///Get All Products from DB

  getAllProducts() {
    return this.httpClient.get<ProductModel>(this.baseUrl + 'getallproducts');
  }

  /// Get All Product By Added By LoggedIn Seller
  getAllProductsBySellerAdded() {
    return this.httpClient.get<ProductModel>(
      this.baseUrl + 'getsellerproducts'
    );
  }

  /// Get Product By Product Id

  getProductByProductId(id: string) {
    return this.httpClient.get<ProductModel>(
      this.baseUrl + `getproductbyproductid/${id}`
    );
  }

  /// Delete Product By Product By Id By Authentic User
  deleteProductById(id: string) {
    return this.httpClient.delete<ProductModel>(
      this.baseUrl + `deleteproductbyproductid/${id}`
    );
  }
}
