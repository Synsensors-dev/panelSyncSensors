import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from '../../Modules/core/services/nav-bar.service';
import { AuthService } from '../../Modules/login/services/auth.service';
import { apiResponse } from '../../Modules/shared/interfaces/apiResponse';
import { SensorsService } from '../../Modules/stations/services/sensors.service';
import * as navRoutes from '../../_navRoutes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements  OnInit{


  public sidebarMinimized = false;
  flag=0; // Cambia a 1 cuando la navbar esta armada

  public navItems=navRoutes.navItems;

  waterStations=navRoutes.waterStations;
  airStations=navRoutes.airStations;

  constructor(private authService:AuthService, private sensorService:SensorsService, private router:Router){
  }
  

  ngOnInit(): void {


      this.sensorService.getSensorTypesOfCompany().subscribe((response:apiResponse)=>{
        console.log(response)
        if(this.navItems.length==1){
          this.createRoutes(response);
        }else{
          this.flag=1
        }
         
      })
  }


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut(){
    this.authService.logOut();
  }
  toProfile(){
    this.router.navigate(["users/profile"])
  }
  toUsersList(){
    this.router.navigate(["users/users-list"])
  }

  createRoutes(response:any){
    for (var item of response.data.typesSensors) {
      console.log(item)
      if(item.name=="TEMPERATURE_AIR" && item.exist==true){
        this.airStations.children.push(navRoutes.TEMPERATURE_AIR)
        continue;
      }
      if(item.name=="HUMIDITY_AIR" && item.exist==true){
        this.airStations.children.push(navRoutes.HUMIDITY_AIR)
        continue;
      }
  
      if(item.name=="CO2_GAS" && item.exist==true){
        this.airStations.children.push(navRoutes.CO2_GAS)
        continue;
      }
      if(item.name=="SOUND" && item.exist==true){
        this.airStations.children.push(navRoutes.SOUND)
        continue;
      }
      if(item.name=="DISSOLVED_OXYGEN" && item.exist==true){
        this.waterStations.children.push(navRoutes.DISSOLVED_OXYGEN)
        continue;
      }
      if(item.name=="TURBIDITY" && item.exist==true){
        this.waterStations.children.push(navRoutes.TURBIDITY)
        continue;
      }
      if(item.name=="CONDUCTIVITY" && item.exist==true){
        this.waterStations.children.push(navRoutes.CONDUCTIVITY)
        continue;
      }
      if(item.name=="TEMPERATURE_LIQUID" && item.exist==true){
        this.waterStations.children.push(navRoutes.TEMPERATURE_LIQUID)
        continue;
      }
      if(item.name=="PH" && item.exist==true){
        this.waterStations.children.push(navRoutes.PH)
        continue;
      }
      if(item.name=="TDS" && item.exist==true){
        this.waterStations.children.push(navRoutes.TDS)
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
  }
}
