import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../login/services/auth.service';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { panelStation } from '../../interfaces/panelStation';
import { StationsService } from '../../services/stations.service';

@Component({
  selector: 'app-parameter-sensors-view',
  templateUrl: './parameter-sensors-view.component.html',
  styleUrls: ['./parameter-sensors-view.component.scss']
})
export class ParameterSensorsViewComponent implements OnInit {

  stations:panelStation[]
  sortedArray=[];
  sensorParameterName:string;
  isLoading:boolean=true;
  param;
  constructor(
    private router:Router,
    private stationsService:StationsService,
    private auth:AuthService, 
    private activatedRoute:ActivatedRoute,
  ){
   }

  ngOnInit(): void {
    //Primero se detecta un cambio de ruta, luego se ejecuta el servicio que captura los datos de la ruta para solicitar la data desde backend
    this.activatedRoute.params.subscribe((params = {}) => {
      this.sensorParameterName=this.activatedRoute.snapshot.params.sensorParameter;
      this.stationsService.getPanelStationsByType(this.auth.getUserCompanyId(),this.sensorParameterName.toUpperCase()).subscribe((response:apiResponse)=>{
        if(response.success){
          console.log(response)
          this.stations=response.data
          this.sortedArray=this.stations;
          console.log(this.stations)
          this.isLoading=false;
        }else{
          console.log(response.message);
        }
      })
    });
  
  }

  goToSensor(id:any,name:any,minConfig:any,maxConfig:any,sensorName:any,stationId:any){
    this.router.navigate([`stations/${this.sensorParameterName}/sensor`],{state:{sensorId:id,stationName:name,min_config:minConfig,max_config:maxConfig,sensorName:sensorName,stationId:stationId}});
  }
  sortMinToMax(){
    this.sortedArray=this.stations.sort((n1,n2)=>{
      if(n1.sensor.last_reading>n2.sensor.last_reading){
        return 1;

      }
      if(n1.sensor.last_reading<n2.sensor.last_reading){
        return -1;
      }
      return 0;
    })
  }
  sortMaxToMin(){

    this.sortedArray=this.stations.sort((n1,n2)=>{
      if(n1.sensor.last_reading<n2.sensor.last_reading){
        return 1;

      }
      if(n1.sensor.last_reading>n2.sensor.last_reading){
        return -1;
      }
      return 0;
    })

  }

}
