import { TestBed } from '@angular/core/testing';

import { StandardFormService } from './sicherheits-check.service';

describe('SicherheitsCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardFormService = TestBed.get(StandardFormService);
    expect(service).toBeTruthy();
  });
});
