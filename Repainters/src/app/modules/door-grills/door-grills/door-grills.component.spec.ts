import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorGrillsComponent } from './door-grills.component';

describe('DoorGrillsComponent', () => {
  let component: DoorGrillsComponent;
  let fixture: ComponentFixture<DoorGrillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoorGrillsComponent]
    });
    fixture = TestBed.createComponent(DoorGrillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
