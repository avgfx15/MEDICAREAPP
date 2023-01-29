import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /// Check localstorage if token is available or not
    /// if gettoken is not null
    if (this.userAuthService.getToken() !== null) {
      /// get role from active user by ActivatedRouteSnapshot
      const role = route.data['role'] as string;

      if (role) {
        /// if role is available then match with current user role by function roleMatch from userAuthSercice
        const match = this.userService.roleMatch([role]);
        /// if both role activeRoute role and localstorage userData role are marched then return true otherwise false
        if (match) {
          return true;
        } else {
          /// both role not match then redirect to forbidden page and return false
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    /// if localstorage or getToken is null or undefine then redirect to signin page
    this.router.navigate(['/signin']);
    return false;
  }
}
