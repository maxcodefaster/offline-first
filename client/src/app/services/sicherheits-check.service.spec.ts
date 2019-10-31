import { TestBed } from '@angular/core/testing';

import { SicherheitsCheckService } from './sicherheits-check.service';

describe('SicherheitsCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SicherheitsCheckService = TestBed.get(SicherheitsCheckService);
    expect(service).toBeTruthy();
  });
});
