
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
    this.stationsService.getPanelStationsByType(this.auth.getUserCompanyId(),"TEMPERATURE").subscribe((response:apiResponse)=>{
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
    this.router.navigate(['stations/temperature/sensor'],{state:{sensorId:id,stationName:name,min_config:minConfig,max_config:maxConfig}});
  }
  //Lo ideal seria hacer un endpoint que traiga el nombre de una estacion, con el reading que se necesite automaticamente

  //ESTACIONES Temperatura
  /*stations:any[]=[ //debe llegar desde bckend
    {
      id:1,
      name:'estacionPrueba1',
      type:'aire',
      status:true,
      min_config:-20,
      max_config:0,
      reading:{
        temperatura:-20,
        humedad:30
      }
    },
    {
      id:2,
      name:'estacionPrueba2',
      type:'aire',
      status:true,
      min_config:-10,
      max_config:0,
      reading:{
        temperatura:10,
        humedad:60
      }
    },
    {
      id:3,
      name:'estacionPrueba3',
      type:'aire',
      status:true,
      min_config:-10,
      max_config:0,
      reading:{
        temperatura:-5,
        humedad:40
      }
    },
    {
      id:4,
      name:'estacionPrueba4',
      type:'aire',
      status:false,
      min_config:-10,
      max_config:0,
      reading:{
        temperatura:-2,
        humedad:10
      }
    }
  ]*/

}
