import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorsComponent } from './pages/temperature-sensors/temperature-sensors.component';

const routes: Routes = [
  {path:'',component:TemperatureSensorsComponent}
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
