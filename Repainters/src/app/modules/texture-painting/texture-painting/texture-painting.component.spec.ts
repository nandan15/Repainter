import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexturePaintingComponent } from './texture-painting.component';

describe('TexturePaintingComponent', () => {
  let component: TexturePaintingComponent;
  let fixture: ComponentFixture<TexturePaintingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TexturePaintingComponent]
    });
    fixture = TestBed.createComponent(TexturePaintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
