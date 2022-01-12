import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorsComponent } from './temperature-sensors.component';

const routes: Routes = [
  {path:'',component:TemperatureSensorsComponent,data:{title:'Sensores Temperatura'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureSensorsRoutingModule { 
  
}
