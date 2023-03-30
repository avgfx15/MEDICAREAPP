import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  resData: any;
  searchResult: boolean = false;
  searchProducts: any;
  cartItems: number = 0;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private sellerService: SellerService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
    // ? Get All Products From localstorage
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart?.items.length ?? 0;
    });
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

  searchProduct(searchQuery: KeyboardEvent) {
    if (searchQuery) {
      const element = searchQuery.target as HTMLInputElement;
      this.sellerService.searchProductByQuery(element.value).subscribe({
        next: (res) => {
          this.resData = res;

          if (this.resData.resStatus === false) {
            this.isDisabled = true;
            this.success = false;
            this.showMsg = this.resData.errorMessage;
            setTimeout(() => {
              this.isDisabled = false;
            }, 3000);
          }

          this.searchResult = true;

          this.searchProducts = this.resData.Products;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  // ? On Click outside Hide Search with blur in html tag
  hideSearch() {
    this.searchResult = false;
  }

  // ? Search for products Click on Search Button redirect to SearchResult Page
  submitSearch(searchInput: string) {
    this.router.navigate([`/search/${searchInput}`]);
  }

  //? Search for products Suggestion Click on Search Result Product redirect to ProductDetails Page
  redirectToproductDetails(productId: string) {
    this.router.navigate([`/productdetail/` + productId]);
  }
}
