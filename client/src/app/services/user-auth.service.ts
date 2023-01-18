import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {
    /* TODO document why this constructor is empty */
  }
  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  getUserData() {
    return localStorage.getItem('userData');
  }
  public setRole(role: string) {
    localStorage.setItem('roles', JSON.stringify(role));
  }
  public getRole() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const role = userData?.user?.role;
    return role;
  }
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public clearStorage() {
    localStorage.clear();
  }
  public userLoggedIn() {
    return this.getUserData();
  }
}
