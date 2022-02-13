
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../login/services/auth.service';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { panelStation } from '../../interfaces/panelStation';
import { StationsService } from '../../services/stations.service';


@Component({
  selector: 'app-air-temperature-sensors',
  templateUrl: './air-temperature-sensors.component.html',
  styleUrls: ['./air-temperature-sensors.component.scss']
})
export class TemperatureSensorsComponent implements OnInit {
  stations:panelStation[]
  constructor(private router:Router, private stationsService:StationsService, private auth:AuthService) { }
  ngOnInit(): void {
    this.stationsService.getPanelStationsByType(this.auth.getUserCompanyId(),"TEMPERATURE_AIR").subscribe((response:apiResponse)=>{
      if(response.success){
        console.log(response)
        this.stations=response.data
        console.log(this.stations)
      }else{
        console.log(response.message);
      }
    })


  }

  goToSensor(id:any,name:any,minConfig:any,maxConfig:any){
    this.router.navigate(['stations/temperatura-aire/sensor'],{state:{sensorId:id,stationName:name,min_config:minConfig,max_config:maxConfig}});
  }


}
