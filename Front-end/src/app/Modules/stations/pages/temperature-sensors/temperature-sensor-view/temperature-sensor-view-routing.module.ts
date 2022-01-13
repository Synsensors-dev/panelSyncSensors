import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorViewComponent } from './temperature-sensor-view.component';

const routes: Routes = [
  {
    path:'',
    data:{title:'Sensor'},
    component:TemperatureSensorViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureSensorViewRoutingModule { }
