import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureSensorsRoutingModule } from './temperature-sensors-routing.module';
import { TemperatureSensorsComponent } from './temperature-sensors.component';
import { SharedModule } from '../../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TemperatureSensorViewComponent } from './temperature-sensor-view/temperature-sensor-view.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TemperatureSensorsComponent,
    TemperatureSensorViewComponent
  ],
  imports: [
    CommonModule,
    TemperatureSensorsRoutingModule,
    SharedModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
    
  ]
})
export class TemperatureSensorsModule {}
