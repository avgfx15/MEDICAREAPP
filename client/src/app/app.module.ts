import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
