import { Component, Input, OnInit } from '@angular/core';
import { SensorsService } from '../../../stations/services/sensors.service';

@Component({
  selector: 'app-sensor-alerts-history',
  templateUrl: './sensor-alerts-history.component.html',
  styleUrls: ['./sensor-alerts-history.component.scss']
})
export class SensorAlertsHistoryComponent implements OnInit {
  @Input() sensorId:string;
  sensorAlerts=[];
  sensorName:string;

  constructor(private sensorsService:SensorsService) { }

  ngOnInit(): void {
    this.sensorsService.getSensorAlerts(this.sensorId).subscribe((response)=>{
      if(response.success){
        this.sensorAlerts=response.data.alerts;
        this.sensorName=response.data.name_sensor;
      }else{
        console.log(response.message)
      }
    })
  }

}
