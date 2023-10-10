import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceViewerComponent } from './absence-viewer.component';

describe('AbsenceViewerComponent', () => {
  let component: AbsenceViewerComponent;
  let fixture: ComponentFixture<AbsenceViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceViewerComponent]
    });
    fixture = TestBed.createComponent(AbsenceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
