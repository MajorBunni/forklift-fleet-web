import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkliftMovementComponent } from './forklift-movement.component';

describe('ForkliftMovementComponent', () => {
  let component: ForkliftMovementComponent;
  let fixture: ComponentFixture<ForkliftMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForkliftMovementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForkliftMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
