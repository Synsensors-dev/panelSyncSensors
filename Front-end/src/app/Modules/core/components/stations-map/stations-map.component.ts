import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stations-map',
  templateUrl: './stations-map.component.html',
  styleUrls: ['./stations-map.component.scss']
})
export class StationsMapComponent implements OnInit {

  constructor() { }
  latitude:number=36.7275974;
  longitude:number=-4.4208521;

  ngOnInit(): void {
  }

}
