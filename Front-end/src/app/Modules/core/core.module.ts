import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DefaultLayoutComponent } from './pages/default-layout';


@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
