import { Location } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorsService } from '../../../services/sensors.service';
import { apiResponse } from '../../../../shared/interfaces/apiResponse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sensor-view',
  templateUrl: './sensor-view.component.html',
  styleUrls: ['./sensor-view.component.scss']
})
export class SensorViewComponent implements OnInit {

  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  public sensorForm:FormGroup;


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

    this.sensorForm=this.fb.group({
      min_config:[],
      max_config:[],
      alert_days:[],
      alert_hours:[],
      alert_minutes:[]
    })
    this.sensorForm.get('min_config').setValue(this.min_config)
    this.sensorForm.get('max_config').setValue(this.max_config)
  }
  saveChanges(){
    this.updateMaxMin();
    this.updateAlertOcurrency();
  }

  updateMaxMin(){

    this.sensorsService.updateSensorMinMax(
      this.sensorId,
      this.sensorForm.get('min_config').value,
      this.sensorForm.get('max_config').value).
      subscribe((response:apiResponse)=>{
        if(response.success){
          this.myModal.hide()
          this.successModal.show()
        }else{
          console.log(response.message);
        }
    })   
  }
  updateAlertOcurrency(){
    let totalMinutes:number = this.sensorForm.get('alert_days').value*1440 + this.sensorForm.get('alert_hours').value*60 + this.sensorForm.get('alert_minutes').value
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

  makePDF(){
    var element = document.getElementById("pdfContent");
    /*html2canvas(element).then((canvas)=>{
      var imgData=canvas.toDataURL('image/png')
      var doc = new jsPDF()
      var imgHeight= canvas.height*208/canvas.width;
      doc.addImage(imgData,0,0,208,imgHeight);
      doc.save("sensor.pdf")
    })*/


    html2canvas((element),{
        onclone: function (clonedDoc) {
            clonedDoc.getElementById('upperBar').style.display = 'none';
            clonedDoc.getElementById('scBox').style.height='100%';
            clonedDoc.getElementById('scBox').style.overflowY='none';
            clonedDoc.getElementById('hidden').style.height='100%';
            clonedDoc.getElementById('rw2').style.height='100%';
            var hg=clonedDoc.getElementById('rw2').clientHeight;
            var newHg=clonedDoc.getElementById('pdfContent').clientHeight+hg;
            clonedDoc.getElementById('pdfContent').style.height=`${newHg}px` 
        }
    }).then((canvas)=>{
      var imgData=canvas.toDataURL('image/png')
      var doc = new jsPDF()
      var imgHeight= canvas.height*208/canvas.width;
      doc.addImage(imgData,0,0,208,imgHeight);
      doc.save("sensor.pdf")
    })
    }
}
