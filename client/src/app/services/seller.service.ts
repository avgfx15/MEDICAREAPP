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
    return this.httpClient.post(
      'http://localhost:3700/addcategory',
      category,
      this.httpOptions
    );
  }
}
