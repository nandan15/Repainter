import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreviewComponent } from './add-preview.component';

describe('AddPreviewComponent', () => {
  let component: AddPreviewComponent;
  let fixture: ComponentFixture<AddPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPreviewComponent]
    });
    fixture = TestBed.createComponent(AddPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
