import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelingComponent } from './paneling.component';

describe('PanelingComponent', () => {
  let component: PanelingComponent;
  let fixture: ComponentFixture<PanelingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelingComponent]
    });
    fixture = TestBed.createComponent(PanelingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
