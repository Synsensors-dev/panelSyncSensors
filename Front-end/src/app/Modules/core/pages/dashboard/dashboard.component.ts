import { Component, OnInit } from '@angular/core';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { SensorsService } from '../../../stations/services/sensors.service';
import { DashboardAlertsService } from '../../services/dashboard-alerts.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  systemUptime:number=99.2;
  systemUptimeDanger:boolean=false;

  numberOfAlerts:number;
  numberOfReadings:number;
  dangerNumberOfAlerts:number=20;
  numberOfAlertsDanger:boolean;
  numberOfAlertsPercentage:number;

  activeSensors:number;
  totalSensors:number;
  activeSensorsDanger:boolean;

  constructor(private dashboardAlertsService:DashboardAlertsService,private sensorsService:SensorsService){}


  ngOnInit(): void {

    this.dashboardAlertsService.getQuantityOfRecentAlerts().subscribe((response:apiResponse)=>{
      if(response.success){
        this.numberOfAlerts=response.data.quantity_alerts;
        this.numberOfAlertsPercentage=response.data.pertencage;
        if(this.numberOfAlerts>this.dangerNumberOfAlerts){
          this.numberOfAlertsDanger=true;
        }else{
          this.numberOfAlertsDanger=false;
        }
      }else{
        console.log(response.message);
      }
    })

    this.sensorsService.getActiveSensors().subscribe((response:apiResponse)=>{
      if(response.success){
        this.totalSensors=response.data.quantitySensors;
        this.activeSensors=response.data.quantitySensorsON;
        if(this.activeSensors!=this.totalSensors){
          this.activeSensorsDanger=true;
        }else{
          this.activeSensorsDanger=false;
        }
      }else{
        console.log(response.message);
      }
    })

    this.sensorsService.getNumberOfReadingsLastWeek().subscribe((response:apiResponse)=>{
      if(response.success){
        this.numberOfReadings=response.data.quantity;
      }else{
        console.log(response.message)
      }
    })

  }

  
}
