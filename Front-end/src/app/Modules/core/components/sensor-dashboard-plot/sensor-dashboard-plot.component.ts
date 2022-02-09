
import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../../stations/services/sensors.service';

@Component({
  selector: 'app-sensor-dashboard-plot',
  templateUrl: './sensor-dashboard-plot.component.html',
  styleUrls: ['./sensor-dashboard-plot.component.scss']
})
export class SensorDashboardPlotComponent implements OnInit {

  selectSensorTypes=[];
  selectedOption;
  currentOption;
  isLoading=true;


  constructor(private sensorService:SensorsService) { }

  ngOnInit(): void {
    this.sensorService.getSensorTypesOfCompany().subscribe((response)=>{
      if(response.success){
        this.selectSensorTypes=response.data.typesSensors;
        this.sensorService.getSensorReadingsByType(this.selectSensorTypes[0].name).subscribe((response)=>{
          if(response.success){
            this.selectedOption=this.selectSensorTypes[0].name;
            this.isLoading=false;
            console.log(response)
            this.lineChartLabels=response.data.months;
            this.lineChartData=response.data.stations;
          }else{
            console.log(response.message)
          }
        })

      }else{
        console.log(response.message)
      }
    })

  }
  public lineChartData: Array<any> = [
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
  capture(){
    this.isLoading=true;
    this.currentOption=this.selectedOption;
    console.log(this.currentOption)
    this.sensorService.getSensorReadingsByType(this.currentOption).subscribe((response)=>{
      if(response.success){
        this.isLoading=false;
        console.log(response)
        this.lineChartData=response.data.stations;
      }else{
        console.log(response.message)
      }
    })

  }



}

