import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResportesSegmentadosComponent } from './resportes-segmentados.component';

describe('ResportesSegmentadosComponent', () => {
  let component: ResportesSegmentadosComponent;
  let fixture: ComponentFixture<ResportesSegmentadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResportesSegmentadosComponent]
    });
    fixture = TestBed.createComponent(ResportesSegmentadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
