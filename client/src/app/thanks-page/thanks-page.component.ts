import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks-page',
  templateUrl: './thanks-page.component.html',
  styleUrls: ['./thanks-page.component.css'],
})
export class ThanksPageComponent implements OnInit {
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  constructor(private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  // ? Backe To Cart Page
  backToHomePage() {
    this.router.navigate(['/']);
  }
}
