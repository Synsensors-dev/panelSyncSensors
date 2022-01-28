import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stations-status-table',
  templateUrl: './stations-status-table.component.html',
  styleUrls: ['./stations-status-table.component.scss']
})
export class StationsStatusTableComponent implements OnInit {
  //Objeto con los header de la tabla
  typesOfSensors=['Temperatura','Co2','Humedad','Calidad De Aire']
  //objeto con el contenido de la tabla
  stations=[
    {
      name:'estacionPrueba1',
      status:1,
      sensorStatus:[1,2,1,1]
    },
    {
      name:'estacionPrueba2',
      status:2,
      sensorStatus:[2,2,1,1]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  toArray(obj: object) {
    return Object.keys(obj).map(key => obj[key])
  }

}
