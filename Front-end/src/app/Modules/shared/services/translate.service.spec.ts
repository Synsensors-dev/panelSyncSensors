import { TestBed } from '@angular/core/testing';

import { TranslateService } from './translate.service';

describe('TranslateServiceService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
