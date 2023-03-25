import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllproductlistComponent } from './allproductlist.component';

describe('AllproductlistComponent', () => {
  let component: AllproductlistComponent;
  let fixture: ComponentFixture<AllproductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllproductlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
