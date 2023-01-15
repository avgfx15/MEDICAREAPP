import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: string = 'default';
  LoggedIn: boolean = false;
  isDisabled: boolean = false;
  userName: string = '';

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.changeMenu();
  }

  isLoggedIn() {
    this.isDisabled = true;
    return this.userService.isLoggedIn();
  }

  changeMenu() {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const role = userData.user.role;
      const userName = userData.user.name;
      if (!role && !userData) {
        this.menuType = 'default';
      } else {
        this.userService.isUserLoggedIn.next(true);
        switch (role) {
          case 'admin':
            this.menuType = 'admin';
            this.userName = userName;
            break;
          case 'seller':
            this.menuType = 'seller';
            this.userName = userName;
            break;
          case 'user':
            this.menuType = 'user';
            this.userName = userName;
            break;
          default:
            this.menuType = 'default';
            break;
        }
      }
    }
  }

  logout() {
    this.isDisabled = false;
    return this.userService.logout();
  }
}
