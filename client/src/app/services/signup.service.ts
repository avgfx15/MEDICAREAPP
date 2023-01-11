import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {
    /* TODO document why this constructor is empty */
  }

  SignupForm(signupFormData: UserModel): Observable<UserModel> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.httpClient.post<UserModel>(
      'http://localhost:3700/route/user/signup',
      signupFormData,
      httpOptions
    );
  }
}
