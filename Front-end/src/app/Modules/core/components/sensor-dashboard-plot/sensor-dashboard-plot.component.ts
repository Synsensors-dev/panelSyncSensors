import { Component, OnInit } from '@angular/core';
import { typeChart } from '../../../shared/interfaces/typeChart';

@Component({
  selector: 'app-sensor-dashboard-plot',
  templateUrl: './sensor-dashboard-plot.component.html',
  styleUrls: ['./sensor-dashboard-plot.component.scss']
})
export class SensorDashboardPlotComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  public lineChartData: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A',
      fill:false,
    },
    {
      data: [65, 29, 58, 84, 51, 55, 12],
      label: 'Series B',
      fill:false,
    }
  ];
  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public lineChartType="line"
  public lineChartOptions={
    responsive: true,
    maintainAspectRatio:false,
    transitions:{
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    }
  }



}

