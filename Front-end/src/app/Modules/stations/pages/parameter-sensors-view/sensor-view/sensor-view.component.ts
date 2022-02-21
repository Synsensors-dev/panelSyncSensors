import { Location } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorsService } from '../../../services/sensors.service';
import { apiResponse } from '../../../../shared/interfaces/apiResponse';

@Component({
  selector: 'app-sensor-view',
  templateUrl: './sensor-view.component.html',
  styleUrls: ['./sensor-view.component.scss']
})
export class SensorViewComponent implements OnInit {

  @ViewChild('sensorConfigModal') public sensorConfigModal: ModalDirective;
  @ViewChild('sensorDataModal') public sensorDataModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  public sensorConfigForm:FormGroup;
  public sensorDataForm:FormGroup;


  constructor(private location:Location , private fb:FormBuilder , private sensorsService:SensorsService) { }
  sensorId:any
  retainer:any //Recibe el objeto con la informacion que viene en la ruta
  stationName:any 
  max_config:any
  min_config:any

  ngOnInit(): void {
    //getState() retorna el state enviado a esta ruta, es decir un objeto con el id de la estacion
    this.retainer=this.location.getState()
    console.log(this.retainer)
    this.sensorId=this.retainer.sensorId
    this.stationName=this.retainer.stationName
    this.min_config=this.retainer.min_config
    this.max_config=this.retainer.max_config

    this.sensorConfigForm=this.fb.group({
      min_config:[],
      max_config:[],
      alert_days:[],
      alert_hours:[],
      alert_minutes:[]
    })
    this.sensorDataForm=this.fb.group({
      sensorName:['',Validators.required],
      stationName:['',Validators.required],
    })
    this.sensorConfigForm.get('min_config').setValue(this.min_config)
    this.sensorConfigForm.get('max_config').setValue(this.max_config)
  }
  uploadConfigChanges(){
    this.updateMaxMin();
    this.updateAlertOcurrency();
  }
  uploadDataChanges(){
    console.log(this.sensorDataForm.get('sensorName').value)
    console.log(this.sensorDataForm.get('stationName').value)

  }

  updateMaxMin(){

    this.sensorsService.updateSensorMinMax(
      this.sensorId,
      this.sensorConfigForm.get('min_config').value,
      this.sensorConfigForm.get('max_config').value).
      subscribe((response:apiResponse)=>{
        if(response.success){
          this.sensorConfigModal.hide()
          this.successModal.show()
        }else{
          console.log(response.message);
        }
    })   
  }
  updateAlertOcurrency(){
    let totalMinutes:number = this.sensorConfigForm.get('alert_days').value*1440 + this.sensorConfigForm.get('alert_hours').value*60 + this.sensorConfigForm.get('alert_minutes').value
    console.log(totalMinutes)
    this.sensorsService.updateAlertOcurrency(this.sensorId,totalMinutes).subscribe((response)=>{
      if(response.success){
        console.log(response)
      }else{
        console.log(response.message);
      }
    })
  }
  successModalClose(){
    this.successModal.hide()
  }


}
