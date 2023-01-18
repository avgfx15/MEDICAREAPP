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
  userData = JSON.parse(localStorage.getItem('userData') || '{}');

  userName = this.userData?.user?.name;
  public isUserLoggedIn() {
    return this.userAuthService.userLoggedIn();
  }

  logout() {
    this.userAuthService.clearStorage();
    this.router.navigate(['']);
  }
}
