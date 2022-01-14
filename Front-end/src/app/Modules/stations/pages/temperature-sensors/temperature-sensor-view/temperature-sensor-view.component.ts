import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-sensor-view',
  templateUrl: './temperature-sensor-view.component.html',
  styleUrls: ['./temperature-sensor-view.component.scss']
})
export class TemperatureSensorViewComponent implements OnInit {

  constructor(private location:Location) { }
  sensorId:any
  retainer:any //Recibe el objeto con la informacion que viene en la ruta
  stationName:any 

  ngOnInit(): void {
    //getState() retorna el state enviado a esta ruta, es decir un objeto con el id de la estacion
    this.retainer=this.location.getState()
    this.sensorId=this.retainer.sensorId
    this.stationName=this.retainer.stationName
    

  }

}
