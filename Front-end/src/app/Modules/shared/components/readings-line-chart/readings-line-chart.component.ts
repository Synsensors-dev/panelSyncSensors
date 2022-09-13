import { Component, Input, OnInit } from '@angular/core';
import { customTooltips } from '@coreui/chartjs';
import { SensorsService } from '../../../stations/services/sensors.service';

@Component({
  selector: 'app-readings-line-chart',
  templateUrl: './readings-line-chart.component.html',
  styleUrls: ['./readings-line-chart.component.scss']
})
export class ReadingsLineChartComponent implements OnInit {
  @Input() sensorId:string;
  timeRange:number=12;
  isLoading=true; //Variable que determina si el componente esta cargando o no
  constructor(private sensorService:SensorsService) { }

  ngOnInit(): void {
    this.sensorService.getSensorGraphicReadings(this.sensorId,this.timeRange).subscribe((response)=>{
      if(response.success){
        console.log(response)
        this.lineChartLabels=response.data.time;
        this.lineChartData[0].data=response.data.readings;
        this.lineChartData[0].label=response.data.name_sensor;
        this.isLoading=false;
      }else{
        console.log(response.message)
      }
    })


  }
  captureTimeRange(capturedTimeRange){
    this.isLoading=true;
    this.timeRange=capturedTimeRange
    this.sensorService.getSensorGraphicReadings(this.sensorId,this.timeRange).subscribe((response)=>{
      if(response.success){
        console.log(response)
        this.lineChartLabels=response.data.time;
        this.lineChartData[0].data=response.data.readings;
        this.lineChartData[0].label=response.data.name_sensor;
        this.isLoading=false;
      }else{
        console.log(response.message)
      }
    })

  }

  public lineChartData=[
    {
      label:"",
      data:[]
    }]
  ;
  public lineChartLabels: Array<any>;
  public lineChartType="line"
  public lineChartOptions={
    responsive: true,
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
