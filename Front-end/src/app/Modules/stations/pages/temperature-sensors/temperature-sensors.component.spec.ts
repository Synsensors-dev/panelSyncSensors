import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureSensorsComponent } from './temperature-sensors.component';

describe('TemperatureSensorsComponent', () => {
  let component: TemperatureSensorsComponent;
  let fixture: ComponentFixture<TemperatureSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperatureSensorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperatureSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
