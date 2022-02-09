import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterSensorsViewComponent } from './parameter-sensors-view.component';

describe('ParameterSensorsViewComponent', () => {
  let component: ParameterSensorsViewComponent;
  let fixture: ComponentFixture<ParameterSensorsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterSensorsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterSensorsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
