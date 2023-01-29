import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private cookieService: CookieService) {
    /* TODO document why this constructor is empty */
  }

  /// Save userData in localstorage after login
  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  /// Get userData when required
  getUserData() {
    return localStorage.getItem('userData');
  }

  /// Set Role in localstorage when user after login
  public setRole(role: string) {
    localStorage.setItem('roles', JSON.stringify(role));
  }
  /// Get Role of user after login
  public getRole() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const role = userData?.user?.role;
    return role;
  }

  /// Set token in localstorage when user login
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
  /// Get token of user
  public getToken() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = userData?.token;
    return token;
  }

  /// On Logout clear or remove all userData, token userrole from local storage
  public clearStorage() {
    localStorage.clear();
  }

  /// Set cookie userId
  public setCookie(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = userData?.user?._id;
    const token = userData?.token;
    this.cookieService.set('userId', userId, { expires: 1 });
    this.cookieService.set('token', token, { expires: 1 });
  }

  /// get Cookie userId
  public getCookie() {
    this.cookieService.get('userId');
    this.cookieService.get('token ');
  }

  /// Delete single cookie token or userId
  public deleteCookie(key: string) {
    this.cookieService.delete(key);
  }

  /// Delete All Cookies
  public deleteAllCookies() {
    this.cookieService.deleteAll();
  }

  /// Check if userData stored in localStoragethen userLoogedIn then no need to display signin Navigation
  public userLoggedIn() {
    return this.getUserData();
  }
}
