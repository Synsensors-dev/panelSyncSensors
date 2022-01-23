import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorViewComponent } from './pages/temperature-sensors/temperature-sensor-view/temperature-sensor-view.component';
import { TemperatureSensorsComponent } from './pages/temperature-sensors/temperature-sensors.component';

const routes: Routes = [
  {
    path:'',
    data:{title:'Estaciones'},
    children:[
      {
        path:'temperature',
        loadChildren: () => import('./pages/temperature-sensors/temperature-sensors.module').then(m=>m.TemperatureSensorsModule)
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
