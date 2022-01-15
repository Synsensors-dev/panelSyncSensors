import { Component, OnInit } from '@angular/core';
import { customTooltips } from '@coreui/chartjs';

@Component({
  selector: 'app-readings-line-chart',
  templateUrl: './readings-line-chart.component.html',
  styleUrls: ['./readings-line-chart.component.scss']
})
export class ReadingsLineChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  /*public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: customTooltips
    },
    responsive:false,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          //color: 'transparent',
          //zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;*/
  public lineChart1Type = 'line';

}
