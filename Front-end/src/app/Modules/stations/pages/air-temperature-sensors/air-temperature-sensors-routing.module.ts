import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorViewComponent } from './air-temperature-sensor-view/air-temperature-sensor-view.component';
import { TemperatureSensorsComponent } from './air-temperature-sensors.component';

const routes: Routes = [
  {path:'',
  data:
    {
      title:'Temperatura Aire'
    },
    children:[
      {
        path:'',
        redirectTo:'sensors'
      },
      {
        path:'sensors',
        component:TemperatureSensorsComponent,
        data:{title:'Sensores'}
      },
      {
        path:'sensor',
        data:{
          title:'Sensor'
        },
        component:TemperatureSensorViewComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureSensorsRoutingModule { 
  
}
