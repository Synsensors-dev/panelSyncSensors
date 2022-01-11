import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureSensorsRoutingModule } from './temperature-sensors-routing.module';
import { TemperatureSensorsComponent } from './temperature-sensors.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    TemperatureSensorsComponent
  ],
  imports: [
    CommonModule,
    TemperatureSensorsRoutingModule,
    SharedModule
  ]
})
export class TemperatureSensorsModule { }
