import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAlertsComponent } from './last-alerts.component';

describe('LastAlertsComponent', () => {
  let component: LastAlertsComponent;
  let fixture: ComponentFixture<LastAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
