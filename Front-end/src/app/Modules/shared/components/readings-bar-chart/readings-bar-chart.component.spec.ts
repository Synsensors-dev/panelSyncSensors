import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingsBarChartComponent } from './readings-bar-chart.component';

describe('ReadingsBarChartComponent', () => {
  let component: ReadingsBarChartComponent;
  let fixture: ComponentFixture<ReadingsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingsBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
