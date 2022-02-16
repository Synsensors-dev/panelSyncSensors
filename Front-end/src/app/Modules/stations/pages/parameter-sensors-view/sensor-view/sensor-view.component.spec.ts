import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorViewComponent } from './sensor-view.component';

describe('SensorViewComponent', () => {
  let component: SensorViewComponent;
  let fixture: ComponentFixture<SensorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
