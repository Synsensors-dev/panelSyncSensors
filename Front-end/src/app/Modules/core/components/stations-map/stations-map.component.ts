import { Component, OnInit } from '@angular/core';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { StationsService } from '../../../stations/services/stations.service';

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.scss']
})
export class StationsMapComponent implements OnInit {

  constructor(private stationsService:StationsService) { }
  stationsCoordinates=[];

  ngOnInit(): void {
    this.stationsService.getStationCoordinates().subscribe((response:apiResponse)=>{
      if(response.success){
        console.log(response)
        this.stationsCoordinates=response.data;

      }else{
        console.log(response.message)
      }
    })
  }

}
