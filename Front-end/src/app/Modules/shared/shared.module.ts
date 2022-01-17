import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReadingsBarChartComponent } from './components/readings-bar-chart/readings-bar-chart.component';
import { SensorAlertsHistoryComponent } from './components/sensor-alerts-history/sensor-alerts-history.component';
import { ReadingsLineChartComponent } from './components/readings-line-chart/readings-line-chart.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ReadingsBarChartComponent,
    SensorAlertsHistoryComponent,
    ReadingsLineChartComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ChartsModule
  ],
  exports:[
    ReadingsBarChartComponent,
    SensorAlertsHistoryComponent,
    ReadingsLineChartComponent
  ]
})
export class SharedModule { }
