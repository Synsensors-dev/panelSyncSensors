import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationsRoutingModule } from './stations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TemperatureSensorsComponent } from './pages/temperature-sensors/temperature-sensors.component';


@NgModule({
  declarations: [
    TemperatureSensorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StationsRoutingModule
  ]
})
export class StationsModule { }
