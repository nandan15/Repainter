import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuoteDialogComponentComponent } from './send-quote-dialog-component.component';

describe('SendQuoteDialogComponentComponent', () => {
  let component: SendQuoteDialogComponentComponent;
  let fixture: ComponentFixture<SendQuoteDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendQuoteDialogComponentComponent]
    });
    fixture = TestBed.createComponent(SendQuoteDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
