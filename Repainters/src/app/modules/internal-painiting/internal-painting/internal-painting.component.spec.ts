import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalPaintingComponent } from './internal-painting.component';

describe('InternalPaintingComponent', () => {
  let component: InternalPaintingComponent;
  let fixture: ComponentFixture<InternalPaintingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalPaintingComponent]
    });
    fixture = TestBed.createComponent(InternalPaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
