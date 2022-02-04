import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    data:{title:'Estaciones'},
    children:[
      {
        path:'temperatura-aire',
        loadChildren: () => import('./pages/air-temperature-sensors/air-temperature-sensors.module').then(m=>m.TemperatureSensorsModule)
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
