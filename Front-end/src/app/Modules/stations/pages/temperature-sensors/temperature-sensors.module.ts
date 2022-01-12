import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureSensorsRoutingModule } from './temperature-sensors-routing.module';
import { TemperatureSensorsComponent } from './temperature-sensors.component';
import { SharedModule } from '../../../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';



@NgModule({
  declarations: [
    TemperatureSensorsComponent
  ],
  imports: [
    CommonModule,
    TemperatureSensorsRoutingModule,
    SharedModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ]
})
export class TemperatureSensorsModule {}
