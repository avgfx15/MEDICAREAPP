import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignIn, UserModel } from '../models/user-model';
import { Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3700/';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userAuthService: UserAuthService,
    private cookieService: CookieService
  ) {
    /* TODO document why this constructor is empty */
  }
  httpOptions = {
    withCredentials: true,
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

  requestHeaders = new HttpHeaders({
    'No-Auth': 'true',
  });

  SignInForm(signInFormData: SignIn): Observable<SignIn> {
    return this.httpClient.post<SignIn>(
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
