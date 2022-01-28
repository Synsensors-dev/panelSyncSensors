import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  systemUptime:number;
  numberOfAlerts:number;
  activeSensors:number;
  totalSensors:number;
  activeSensorsDanger:boolean;
  ngOnInit(): void {
    this.systemUptime=99.7;
    this.numberOfAlerts=4;
    this.activeSensors=20;
    this.totalSensors=21;
    this.activeSensorsDanger=false;
      
  }
  constructor(){
  }

  
}
