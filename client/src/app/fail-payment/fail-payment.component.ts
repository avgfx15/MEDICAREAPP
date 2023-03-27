import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fail-payment',
  templateUrl: './fail-payment.component.html',
  styleUrls: ['./fail-payment.component.css'],
})
export class FailPaymentComponent implements OnInit {
  isDisabled: boolean = false;
  showMsg: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  backToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
