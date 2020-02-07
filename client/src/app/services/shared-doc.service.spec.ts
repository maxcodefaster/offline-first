import { TestBed } from '@angular/core/testing';

import { SharedDocService } from './shared-doc.service';

describe('SharedDocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedDocService = TestBed.get(SharedDocService);
    expect(service).toBeTruthy();
  });
});
