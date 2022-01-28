import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDashboardPlotComponent } from './sensor-dashboard-plot.component';

describe('SensorDashboardPlotComponent', () => {
  let component: SensorDashboardPlotComponent;
  let fixture: ComponentFixture<SensorDashboardPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorDashboardPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDashboardPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
