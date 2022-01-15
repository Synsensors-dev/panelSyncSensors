import { Location } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-temperature-sensor-view',
  templateUrl: './temperature-sensor-view.component.html',
  styleUrls: ['./temperature-sensor-view.component.scss']
})
export class TemperatureSensorViewComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;
  public sensorForm:FormGroup;


  constructor(private location:Location , private fb:FormBuilder) { }
  sensorId:any
  retainer:any //Recibe el objeto con la informacion que viene en la ruta
  stationName:any 

  ngOnInit(): void {
    //getState() retorna el state enviado a esta ruta, es decir un objeto con el id de la estacion
    this.retainer=this.location.getState()
    this.sensorId=this.retainer.sensorId
    this.stationName=this.retainer.stationName

    this.sensorForm=this.fb.group({
      min_value:[''],
      max_value:[''],
    })
    

  }

  //Variables del modal (popup)




}
