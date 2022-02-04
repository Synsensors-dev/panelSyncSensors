import { Component, OnInit } from '@angular/core';
import { DashboardAlertsService } from '../../services/dashboard-alerts.service';

@Component({
  selector: 'app-last-alerts',
  templateUrl: './last-alerts.component.html',
  styleUrls: ['./last-alerts.component.scss']
})
export class LastAlertsComponent implements OnInit {

  alertsArray:any;

  constructor(private dashboardAlertsService:DashboardAlertsService) { }

  ngOnInit(): void {

    this.dashboardAlertsService.getRecentAlerts().subscribe((response)=>{
      if(response.success){
        console.log(response)
        this.alertsArray=response.data
      }else{
        console.log(response.message);
      }
    })
  }

}
