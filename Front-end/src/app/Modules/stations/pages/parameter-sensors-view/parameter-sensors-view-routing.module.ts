import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParameterSensorsViewComponent } from './parameter-sensors-view.component';
import { SensorViewComponent } from './sensor-view/sensor-view.component';

const routes: Routes = [
  {path:'',
    data:
      {
        title:'',
      },
    children:[
      {
        path:'',
        redirectTo:'sensors'
      },
      {
        path:'sensors',
        component:ParameterSensorsViewComponent,
        data:{title:'Sensores'}
      },
      {
        path:'sensor',
        data:{
          title:'Sensor'
        },
        component:SensorViewComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterSensorsViewRoutingModule{

}
