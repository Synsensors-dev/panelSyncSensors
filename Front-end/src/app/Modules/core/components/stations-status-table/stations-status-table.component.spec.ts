import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsStatusTableComponent } from './stations-status-table.component';

describe('StationsStatusTableComponent', () => {
  let component: StationsStatusTableComponent;
  let fixture: ComponentFixture<StationsStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsStatusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
