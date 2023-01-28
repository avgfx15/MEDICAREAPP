import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
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
import { CartComponent } from './user/cart/cart.component';
import { MyordersComponent } from './user/myorders/myorders.component';

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
    CartComponent,
    MyordersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
