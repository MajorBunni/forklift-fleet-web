import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkliftListComponent } from './forklift-list.component';

describe('ForkliftListComponent', () => {
  let component: ForkliftListComponent;
  let fixture: ComponentFixture<ForkliftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForkliftListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForkliftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
