import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductPageComponent } from './search-product-page.component';

describe('SearchProductPageComponent', () => {
  let component: SearchProductPageComponent;
  let fixture: ComponentFixture<SearchProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
