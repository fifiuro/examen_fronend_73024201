import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResportesVencidosComponent } from './resportes-vencidos.component';

describe('ResportesVencidosComponent', () => {
  let component: ResportesVencidosComponent;
  let fixture: ComponentFixture<ResportesVencidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResportesVencidosComponent]
    });
    fixture = TestBed.createComponent(ResportesVencidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
