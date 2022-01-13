import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureSensorViewComponent } from './temperature-sensor-view.component';

describe('TemperatureSensorViewComponent', () => {
  let component: TemperatureSensorViewComponent;
  let fixture: ComponentFixture<TemperatureSensorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureSensorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureSensorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
