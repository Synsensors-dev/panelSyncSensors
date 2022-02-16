import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StationsMapComponent } from './components/stations-map/stations-map.component';
import { LastAlertsComponent } from './components/last-alerts/last-alerts.component';
import { AgmCoreModule } from '@agm/core';
import { StationsStatusTableComponent } from './components/stations-status-table/stations-status-table.component';
import { SensorDashboardPlotComponent } from './components/sensor-dashboard-plot/sensor-dashboard-plot.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StationsMapComponent,
    LastAlertsComponent,
    StationsStatusTableComponent,
    SensorDashboardPlotComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDGNfFQ1rTIjzBtSAc5uQM28ywb5aZ8E8E'
    }),
    ChartsModule,
    FormsModule
  ],
  exports:[
    StationsMapComponent,
    LastAlertsComponent,
    StationsStatusTableComponent,
    SensorDashboardPlotComponent
  ]
})
export class CoreModule { }
