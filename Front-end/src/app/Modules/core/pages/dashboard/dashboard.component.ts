import { Component, OnInit } from '@angular/core';
import { SensorsService } from '../../../stations/services/sensors.service';
import { DashboardAlertsService } from '../../services/dashboard-alerts.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  systemUptime:number;
  numberOfAlerts:number;
  numberOfAlertsPercentage:number;
  activeSensors:number;
  totalSensors:number;
  activeSensorsDanger:boolean;
  constructor(private dashboardAlertsService:DashboardAlertsService,private sensorsService:SensorsService){}


  ngOnInit(): void {

    this.dashboardAlertsService.getQuantityOfRecentAlerts().subscribe((response)=>{
      if(response.success){
        this.numberOfAlerts=response.data.quantity_alerts;
        this.numberOfAlertsPercentage=response.data.pertencage;
      }else{
        console.log(response.message);
      }
    })

    this.sensorsService.getActiveSensors().subscribe((response)=>{
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

  }

  
}
