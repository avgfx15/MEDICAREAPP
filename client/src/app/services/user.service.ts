import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  changeMenu(role: string) {
    throw new Error('Method not implemented.');
  }
  resData: any = {};
  role = new BehaviorSubject<string>('');
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
        this.resData = res.body;
        if (this.resData) {
          const resStatus = this.resData.resStatus;

          if (!resStatus) {
            this.isUserLoggedIn.next(false);
            this.errorMessage.next(this.resData.errorMessage);
            this.router.navigate(['signup']);
          } else {
            const token = this.resData.token;
            const role = this.resData.user.role;
            this.isUserLoggedIn.next(true);
            this.role.next(role);

            this.successMessage.next(this.resData.successMessage);
            localStorage.setItem('userData', JSON.stringify(this.resData));
            if (token && role === 'admin') {
              this.router.navigate(['admin']);
              console.log('admin');
            } else if (token && role === 'seller') {
              this.router.navigate(['seller']);
              console.log('seller');
            } else {
              this.router.navigate(['user']);
              console.log('user');
            }
          }
        }
      });
  }

  //` user is logged in

  //` reload or refresh page reloaduser again
  reloadUser() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const role = userData.user.role;
      if (!role && !userData) {
        this.isUserLoggedIn.next(false);
        this.router.navigate(['signup']);
      } else {
        this.isUserLoggedIn.next(true);
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
  }

  //` isUserLoggedIn or not create function
  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }

  //` Logout clear localstorage data
  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
