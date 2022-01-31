import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-dashboard-plot',
  templateUrl: './sensor-dashboard-plot.component.html',
  styleUrls: ['./sensor-dashboard-plot.component.scss']
})
export class SensorDashboardPlotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A',
      options:{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    },
    {
      data: [65, 29, 58, 84, 51, 55, 12],
      label: 'Series B',
      options:{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    }
  ];
  public lineChart1Labels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public lineChart1Type="line"


  public xd:{
    ultimos7meses:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    data:[
      {
        name:'estacion1',
        data:[10,20,30,41,12,40,12]
      },
      {
        name:'estacion2',
        data:[10,21,30,21,12,40,12]
      }
    ]
  }

}

