import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalsComponent } from './additionals.component';

describe('AdditionalsComponent', () => {
  let component: AdditionalsComponent;
  let fixture: ComponentFixture<AdditionalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalsComponent]
    });
    fixture = TestBed.createComponent(AdditionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
