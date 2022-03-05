
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../../shared/services/translate.service';
import { SensorsService } from '../../../stations/services/sensors.service';

@Component({
  selector: 'app-sensor-dashboard-plot',
  templateUrl: './sensor-dashboard-plot.component.html',
  styleUrls: ['./sensor-dashboard-plot.component.scss']
})
export class SensorDashboardPlotComponent implements OnInit {

  selectSensorTypes=[]; //para guardar tipos de sensor
  //variables del select para capturar selección
  selectedOption;
  currentOption;
  spanishSensorsTypes;
  isLoading=true; //Variable que determina si el componente esta cargando o no
  timeRange:number=12; //Variable que captura el rango de tiempo en el que se obtendran los datos 30 dias, 3 meses o 6 meses


  constructor(private sensorService:SensorsService,private translate:TranslateService) { }

  ngOnInit(): void {
    this.sensorService.getSensorTypesOfCompany().subscribe((response)=>{
      if(response.success){
        this.selectSensorTypes=response.data.typesSensors;
        this.sensorService.getSensorReadingsByType(this.selectSensorTypes[0].name,this.timeRange).subscribe((response)=>{
          if(response.success){
            this.selectedOption=this.selectSensorTypes[0].name;
            this.isLoading=false;
            console.log(response)
            this.lineChartLabels=response.data.time;
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
  public lineChartLabels: Array<any>;
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
    this.sensorService.getSensorReadingsByType(this.currentOption,this.timeRange).subscribe((response)=>{
      if(response.success){
        this.isLoading=false;
        this.lineChartLabels=response.data.time;
        this.lineChartData=response.data.stations;
      }else{
        console.log(response.message)
      }
    })

  }
  toSpanish(item){
    return this.translate.itemToSpanish(item)
  }
  captureTimeRange(timeCaptured){
    this.isLoading=true;
    this.timeRange=timeCaptured;
    this.currentOption=this.selectedOption;
    this.sensorService.getSensorReadingsByType(this.currentOption,this.timeRange).subscribe((response)=>{
      if(response.success){
        this.isLoading=false;
        this.lineChartLabels=response.data.time;
        this.lineChartData=response.data.stations;
      }else{
        console.log(response.message)
      }
    })
  }



}

