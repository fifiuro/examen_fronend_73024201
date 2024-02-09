import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosFormComponent } from './prestamos-form.component';

describe('PrestamosFormComponent', () => {
  let component: PrestamosFormComponent;
  let fixture: ComponentFixture<PrestamosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestamosFormComponent]
    });
    fixture = TestBed.createComponent(PrestamosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
