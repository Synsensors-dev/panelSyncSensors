import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureSensorViewRoutingModule } from './temperature-sensor-view-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { TemperatureSensorViewComponent } from './temperature-sensor-view.component';


@NgModule({
  declarations: [
    TemperatureSensorViewComponent
  ],
  imports: [
    CommonModule,
    TemperatureSensorViewRoutingModule,
    SharedModule
  ]
})
export class TemperatureSensorViewModule { }
