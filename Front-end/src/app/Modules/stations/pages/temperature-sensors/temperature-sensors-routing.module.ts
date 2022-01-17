import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureSensorViewComponent } from './temperature-sensor-view/temperature-sensor-view.component';
import { TemperatureSensorsComponent } from './temperature-sensors.component';

const routes: Routes = [
  {path:'',
  data:
    {
      title:'Temperature'
    },
    children:[
      {
        path:'',
        redirectTo:'sensors'
      },
      {
        path:'sensors',
        component:TemperatureSensorsComponent,
        data:{title:'Sensors'}
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
