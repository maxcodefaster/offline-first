import { TestBed } from '@angular/core/testing';

import { ServiceCheckService } from './service-check.service';

describe('ServiceCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceCheckService = TestBed.get(ServiceCheckService);
    expect(service).toBeTruthy();
  });
});
