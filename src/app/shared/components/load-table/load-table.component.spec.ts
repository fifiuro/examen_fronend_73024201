import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTableComponent } from './load-table.component';

describe('LoadTableComponent', () => {
  let component: LoadTableComponent;
  let fixture: ComponentFixture<LoadTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadTableComponent]
    });
    fixture = TestBed.createComponent(LoadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
