import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  resData: any = {};
  token = new BehaviorSubject<string>('');
  userRole = new BehaviorSubject<string>('');
  resStatus = new BehaviorSubject<boolean>(false);
  errorMessage = new BehaviorSubject<string>('');
  successMessage = new BehaviorSubject<string>('');
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {
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

  SignInForm(signInFormData: UserModel) {
    this.httpClient
      .post<UserModel>(
        'http://localhost:3700/route/user/signin',
        signInFormData,
        { observe: 'response' }
      )
      .subscribe((res) => {
        /// Get Response in resData
        this.resData = res.body;
        /// Check token from Server side First check token in this service page
        this.token.next(this.resData.token);
        /// Send resStatus for Further Action in signup page if true then navigate as per userRoles page
        this.resStatus.next(this.resData.resStatus);
        /// Get userRole from Server side for future navigation from sign up page
        this.userRole.next(this.resData.user.role);
        /// Get successMessage from Server side if navigate properly
        this.successMessage.next(this.resData.successMessage);
        console.log(this.resData.successMessage);
        /// Get errorMessage from Server side if not navigate or resStatus is false then show errorMessage and navigate to login page again from sign up page
        this.errorMessage.next(this.resData.errorMessage);
        console.log(this.resData);
        console.log(this.resData.errorMessage);

        /// If token is available then store User data in localstorage and send feedback to user-auth-guard to access secure route
        if (this.resData.token && this.resData.resStatus) {
          this.isUserLoggedIn.next(true);
          localStorage.setItem('userData', JSON.stringify(this.resData));
        } else {
          /// If no token send feedback to auth-guard to restrict to access secure route

          this.isUserLoggedIn.next(false);
        }
      });
  }

  //` user is logged in

  //` reload or refresh page reloaduser again
  reloadUser() {
    this.isUserLoggedIn.next(true);
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const role = userData.user.role;
    switch (role) {
      case 'admin':
        this.router.navigate(['admin']);
        break;
      case 'seller':
        this.router.navigate(['seller']);
        break;
      case 'user':
        this.router.navigate(['user']);
        break;
      default:
        this.router.navigate(['']);
        break;
    }
  }
}
