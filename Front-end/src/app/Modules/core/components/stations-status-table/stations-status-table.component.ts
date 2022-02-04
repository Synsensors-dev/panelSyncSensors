import { Component, OnInit } from '@angular/core';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { StationsService } from '../../../stations/services/stations.service';

@Component({
  selector: 'app-stations-status-table',
  templateUrl: './stations-status-table.component.html',
  styleUrls: ['./stations-status-table.component.scss']
})
export class StationsStatusTableComponent implements OnInit {
  //Objeto con los header de la tabla
  typesOfSensors=[]
  //objeto con el contenido de la tabla
  stations=[]

  constructor(private stationsService:StationsService) { }

  ngOnInit(): void {
    this.stationsService.getStationsStatus().subscribe((response)=>{
      if(response.success){
        this.typesOfSensors=response.data.types_of_sensors;
        this.stations=response.data.stations;
      }else{
        console.log(response.message);
      }
    })
  }
  toArray(obj: object) {
    return Object.keys(obj).map(key => obj[key])
  }

}
