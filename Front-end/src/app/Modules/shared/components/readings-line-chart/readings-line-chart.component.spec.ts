import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingsLineChartComponent } from './readings-line-chart.component';

describe('ReadingsLineChartComponent', () => {
  let component: ReadingsLineChartComponent;
  let fixture: ComponentFixture<ReadingsLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingsLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
