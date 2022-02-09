import { TestBed } from '@angular/core/testing';

import { DashboardAlertsService } from './dashboard-alerts.service';

describe('DashboardAlertsService', () => {
  let service: DashboardAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
