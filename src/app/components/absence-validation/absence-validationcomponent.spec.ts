import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderAbsenceComponent } from './absence-validation.component';

describe('ValiderAbsenceComponent', () => {
  let component: ValiderAbsenceComponent;
  let fixture: ComponentFixture<ValiderAbsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValiderAbsenceComponent]
    });
    fixture = TestBed.createComponent(ValiderAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
