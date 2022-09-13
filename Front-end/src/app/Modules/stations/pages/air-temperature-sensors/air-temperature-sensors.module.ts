import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureSensorsRoutingModule } from './air-temperature-sensors-routing.module';
import { TemperatureSensorsComponent } from './air-temperature-sensors.component';
import { SharedModule } from '../../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TemperatureSensorViewComponent } from './air-temperature-sensor-view/air-temperature-sensor-view.component';
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
