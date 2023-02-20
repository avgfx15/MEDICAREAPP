import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}
  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
  /// Display User name after login in Navbar
  /// Get userdata and user name from local storage
  userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userName = this.userData?.user?.name;

  /// If User logged in then disable signin Navigation link and display logout navigationlink
  public isUserLoggedIn() {
    return this.userAuthService.userLoggedIn();
  }

  /// On logout clear userData from local storage and navigate to home page
  logout(): void {
    this.userAuthService.clearStorage();
    this.userAuthService.deleteAllCookies();
    this.userAuthService.deleteAllCookies();
    this.router.navigate(['']);
  }
}
