import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { RouterModule } from '@angular/router';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllSellersComponent } from './admin/all-sellers/all-sellers.component';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AllproductlistComponent } from './admin/allproductlist/allproductlist.component';
import { AllordersComponent } from './admin/allorders/allorders.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';

import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';

import { AddnewproductComponent } from './seller/addnewproduct/addnewproduct.component';
import { SellerproductlistComponent } from './seller/sellerproductlist/sellerproductlist.component';
import { MyordersComponent } from './user/myorders/myorders.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UpdateproductComponent } from './seller/updateproduct/updateproduct.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { AdminUpdateProductComponent } from './admin/admin-update-product/admin-update-product.component';
import { SearchProductPageComponent } from './search-product-page/search-product-page.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { OrderModule } from './order/order.module';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ThanksPageComponent } from './thanks-page/thanks-page.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { OrderViewComponent } from './order-view/order-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignUpComponent,
    FooterComponent,
    AdminHomeComponent,
    SellerHomeComponent,
    UserHomeComponent,
    AllUsersComponent,
    AllSellersComponent,
    ForbiddenComponent,
    AboutComponent,
    ContactComponent,
    AllproductlistComponent,
    AllordersComponent,
    SellerOrdersComponent,
    AddnewproductComponent,
    SellerproductlistComponent,
    MyordersComponent,
    ProductDetailComponent,
    UpdateproductComponent,
    UpdateUserComponent,
    AdminUpdateProductComponent,
    SearchProductPageComponent,
    OrderListComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckOutComponent,
    ThanksPageComponent,
    FailPaymentComponent,
    OrderViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FileUploadModule,
    ReactiveFormsModule,
    OrderModule,
    NgxStripeModule.forRoot(
      'pk_test_51Mpi6hSJqIJ0daJKdVY8jOYkSkd3xWQxMRBS0dFcLNxJavgi5HbGJfrdBy4zEpXIuRIlBAmIuXrqbqqD9CoeH9Dl007uPpbypR'
    ),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
