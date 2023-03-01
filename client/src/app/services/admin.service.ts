import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  get() {
    throw new Error('Method not implemented.');
  }
  baseUrl = 'http://localhost:3700/';
  constructor(private httpClient: HttpClient) {
    /* TODO document why this constructor is empty */
  }

  //? Get All Users Data
  getAllUsers() {
    return this.httpClient.get(this.baseUrl + 'allusers');
  }

  //? Get User By userId

  getUserByUserId(id: string) {
    console.log('admin Route');

    return this.httpClient.get(this.baseUrl + `getuser/${id}`);
  }

  // ? Get All Sellers
  getAllSellers() {
    return this.httpClient.get(this.baseUrl + 'allsellers');
  }

  // +? Get All Roles
  getAllRoles() {
    return this.httpClient.get(this.baseUrl + 'getallroles');
  }

  //? Update User By UserId
  updateUserByUserId(userData: UserModel) {
    return this.httpClient.put<UserModel>(
      this.baseUrl + `updateuser/${userData._id}`,
      userData
    );
  }

  //- Delete User By UserId
  deleteUserByUserId(id: string) {
    return this.httpClient.delete(this.baseUrl + `deleteuser/${id}`);
  }
}
