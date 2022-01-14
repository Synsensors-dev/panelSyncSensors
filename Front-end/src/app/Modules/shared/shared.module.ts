import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReadingsBarChartComponent } from './components/readings-bar-chart/readings-bar-chart.component';
import { SensorAlertsHistoryComponent } from './components/sensor-alerts-history/sensor-alerts-history.component';


@NgModule({
  declarations: [
    ReadingsBarChartComponent,
    SensorAlertsHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
  ],
  exports:[
    ReadingsBarChartComponent,
    SensorAlertsHistoryComponent
  ]
})
export class SharedModule { }
