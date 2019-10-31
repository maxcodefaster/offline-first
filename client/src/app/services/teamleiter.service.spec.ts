import { TestBed } from '@angular/core/testing';

import { TeamleiterService } from './teamleiter.service';

describe('TeamleiterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamleiterService = TestBed.get(TeamleiterService);
    expect(service).toBeTruthy();
  });
});
