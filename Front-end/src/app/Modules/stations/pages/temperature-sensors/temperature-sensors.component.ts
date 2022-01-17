
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-temperature-sensors',
  templateUrl: './temperature-sensors.component.html',
  styleUrls: ['./temperature-sensors.component.scss']
})
export class TemperatureSensorsComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToSensor(id:any,name:any){
    this.router.navigate(['stations/temperature/sensor'],{state:{sensorId:id,stationName:name}});
  }
  //Lo ideal seria hacer un endpoint que traiga el nombre de una estacion, con el reading que se necesite automaticamente

  //ESTACIONES Temperatura
  stations:any[]=[ //debe llegar desde bckend
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
  ]

}
