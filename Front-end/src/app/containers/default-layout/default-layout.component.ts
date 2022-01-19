import {Component, OnInit} from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavBarService } from '../../Modules/core/services/nav-bar.service';
import { AuthService } from '../../Modules/login/services/auth.service';
import { apiResponse } from '../../Modules/shared/interfaces/apiResponse';
import { AIR, airStations, HUMIDITY, navItems, TEMPERATURE, waterStations } from '../../_navRoutes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements  OnInit{

  temperatureRoute=TEMPERATURE;humidityRoute=HUMIDITY;airRoute=AIR

  public sidebarMinimized = false;
  flag=0; // Cambia a 1 cuando la navbar esta armada

  public navItems=navItems;

  waterStations=waterStations;
  airStations=airStations;

  constructor(private authService:AuthService, private navBarService:NavBarService){
  }
  

  ngOnInit(): void {

      this.navBarService.getSensorTypesOfCompany().subscribe((response:apiResponse)=>{
        console.log(response)
        for (var item of response.data.typesSensors) {
          console.log(item)
          if(item.name=="TEMPERATURE" && item.exist==true){
            this.airStations.children.push(this.temperatureRoute)
            continue;
          }
          if(item.name=="AIR" && item.exist==true){
            this.airStations.children.push(this.airRoute)
            continue;
          }
          if(item.name=="HUMIDITY" && item.exist==true){
            this.airStations.children.push(this.humidityRoute)
            continue;
          }
        }


        if(this.waterStations.children.length!=0){
          this.navItems.push(this.waterStations)
        }
        if(this.airStations.children.length!=0){
          this.navItems.push(this.airStations)
        }
        this.flag=1
      })
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut(){
    this.authService.logOut();
  }
}
