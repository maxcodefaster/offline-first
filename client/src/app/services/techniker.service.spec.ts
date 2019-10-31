import { TestBed } from '@angular/core/testing';

import { TechnikerService } from './techniker.service';

describe('TechnikerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnikerService = TestBed.get(TechnikerService);
    expect(service).toBeTruthy();
  });
});
