import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private httpClient: HttpClient) {
    /* TODO document why this constructor is empty */
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /// Add Category Api Service
  addCategory(category: string) {
    console.log('Seller Service');

    return this.httpClient.post(
      'http://localhost:3700/api/category/test',
      category
    );
  }
}
