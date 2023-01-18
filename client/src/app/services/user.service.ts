import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3700/';
  resData: any = {};
  role = new BehaviorSubject<string>('');
  resStatus = new BehaviorSubject<boolean>(false);
  errorMessage = new BehaviorSubject<string>('');
  successMessage = new BehaviorSubject<string>('');
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userAuthService: UserAuthService
  ) {
    /* TODO document why this constructor is empty */
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //` Sign Up Function
  SignupForm(signupFormData: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(
      this.baseUrl + 'route/signup',
      signupFormData,
      this.httpOptions
    );
  }

  //` Sign In Function
  //

  SignInForm(signInFormData: UserModel) {
    return this.httpClient.post(
      this.baseUrl + 'route/signin',
      signInFormData,
      this.httpOptions
    );
  }

  // //` reload or refresh page reloaduser again

  //` Match user role for navbar
  roleMatch(allowRole: any): boolean {
    let isMatch = false;
    const userRole = this.userAuthService.getRole();
    if (userRole != null && userRole) {
      for (let i of allowRole) {
        if (userRole === i) {
          isMatch = true;
          return isMatch;
        } else {
          return isMatch;
        }
      }
      return isMatch;
    } else {
      return isMatch;
    }
  }
}
