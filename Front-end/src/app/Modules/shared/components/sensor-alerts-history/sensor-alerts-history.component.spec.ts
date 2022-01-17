import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorAlertsHistoryComponent } from './sensor-alerts-history.component';

describe('SensorAlertsHistoryComponent', () => {
  let component: SensorAlertsHistoryComponent;
  let fixture: ComponentFixture<SensorAlertsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorAlertsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorAlertsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
