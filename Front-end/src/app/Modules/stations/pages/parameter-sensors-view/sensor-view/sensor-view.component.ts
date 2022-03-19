import { DatePipe, Location } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import {ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SensorsService } from '../../../services/sensors.service';
import { apiResponse } from '../../../../shared/interfaces/apiResponse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StationsService } from '../../../services/stations.service';

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


  constructor(
    private location:Location , 
    private fb:FormBuilder , 
    private sensorsService:SensorsService , 
    private datePipe:DatePipe , 
    private stationService:StationsService
    ){ }

  sensorId:any;
  retainer:any; //Recibe el objeto con la informacion que viene en la ruta
  stationName:any 
  stationId:any
  sensorName:any;
  max_config:any;
  min_config:any;
  aux:any;
  actualDay:any;
  isChecked:any;


  ngOnInit(): void {
    this.isChecked=true;
    //getState() retorna el state enviado a esta ruta, es decir un objeto con el id de la estacion
    this.aux=new Date();
    this.actualDay=this.datePipe.transform(this.aux,"yyyy-MM-dd");
    this.retainer=this.location.getState()
    console.log(this.retainer)
    this.sensorId=this.retainer.sensorId
    this.stationName=this.retainer.stationName
    this.min_config=this.retainer.min_config
    this.max_config=this.retainer.max_config
    this.sensorName=this.retainer.sensorName;
    this.stationId=this.retainer.stationId;

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
    this.sensorConfigModal.hide()
    if(this.updateMaxMin()&&this.updateAlertOcurrency()){
      this.successModal.show();
    }
  }


  uploadDataChanges(){
    this.sensorDataModal.hide()
    if(this.updateStationName() &&   this.updateSensorName()){
      this.successModal.show()
    }
  }

  async updateSensorName(){
    const response:apiResponse=await this.sensorsService.changeSensorName(this.sensorDataForm.get("sensorName").value,this.sensorId).toPromise()
    if(response.success){
      return true;
    }else{
      return false;
    }
  }
  async updateStationName(){
    const response:apiResponse=await this.stationService.changeStationName(this.sensorDataForm.get("stationName").value,this.stationId).toPromise()
    if(response.success){
      return true
    }else{
      return false
    }
  }


  async updateMaxMin(){

    const response:apiResponse= await this.sensorsService.updateSensorMinMax(
      this.sensorId,
      this.sensorConfigForm.get('min_config').value,
      this.sensorConfigForm.get('max_config').value).toPromise();
    
    if(response.success){
      return true
    }else{
      return false
    }
      
  }
  async updateAlertOcurrency(){

    if(this.isChecked){
      let totalMinutes:number = this.sensorConfigForm.get('alert_days').value*1440 + this.sensorConfigForm.get('alert_hours').value*60 + this.sensorConfigForm.get('alert_minutes').value
      console.log(totalMinutes)
       const response=await this.sensorsService.updateAlertOcurrency(this.sensorId,totalMinutes).toPromise()
      if(response.success){
        return true
      }else{
        return false
      }

    }else{
      const response=await this.sensorsService.setDefaultAlertOcurrency(this.sensorId).toPromise()
      if(response.success){
        return true
      }else{
        return false
      }
    }
  }
  successModalClose(){
    this.successModal.hide()
  }
 alertSwitch(){
    this.isChecked=!this.isChecked
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
            clonedDoc.getElementById('show').style.display = 'block';
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

    openParameterPop(){
      this.sensorsService.getCustomAlertStatus(this.sensorId).subscribe((response:apiResponse)=>{
        if(response.success){
          console.log(response)
          this.isChecked=response.data.custom_alert
          if(this.isChecked==true){
            let responseMinutes=response.data.time;
            let days:number;
            let hours:number;
            let minutes:number;
            if(responseMinutes/1440>0){
              days=Math.floor(responseMinutes/1440);
              responseMinutes=responseMinutes%1440
              this.sensorConfigForm.get("alert_days").setValue(days)
            }
            if(responseMinutes/60>0){
              hours=Math.floor(responseMinutes/60)
              responseMinutes=responseMinutes%60
              this.sensorConfigForm.get("alert_hours").setValue(hours)
            }
            if(responseMinutes!=0){
              minutes=responseMinutes;
              this.sensorConfigForm.get("alert_minutes").setValue(minutes)
            }
          }
          this.sensorConfigModal.show()
        }else{
          console.log(response.message)
        }
      })
    
    }
    openDataPop(){
      this.sensorDataForm.get("sensorName").setValue(this.sensorName)
      this.sensorDataForm.get("stationName").setValue(this.stationName)
      this.sensorDataModal.show()
    }
}

