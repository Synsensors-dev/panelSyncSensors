import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ParameterSensorsViewRoutingModule } from './parameter-sensors-view-routing.module';
import { ParameterSensorsViewComponent } from './parameter-sensors-view.component';
import { SensorViewComponent } from './sensor-view/sensor-view.component';



@NgModule({
  declarations: [
    ParameterSensorsViewComponent,
    SensorViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BsDropdownModule,
    ParameterSensorsViewRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
    
  ],
  providers:[DatePipe]
})
export class ParameterSensorsViewModule { }
