import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: CustomerViewComponent;
  let fixture: ComponentFixture<CustomerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerViewComponent]
    });
    fixture = TestBed.createComponent(CustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
