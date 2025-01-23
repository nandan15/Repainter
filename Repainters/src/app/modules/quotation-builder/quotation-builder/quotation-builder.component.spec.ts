import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationBuilderComponent } from './quotation-builder.component';

describe('QuotationBuilderComponent', () => {
  let component: QuotationBuilderComponent;
  let fixture: ComponentFixture<QuotationBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationBuilderComponent]
    });
    fixture = TestBed.createComponent(QuotationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
