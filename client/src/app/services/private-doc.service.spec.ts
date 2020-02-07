import { TestBed } from '@angular/core/testing';

import { PrivateDocService } from './private-doc.service';

describe('SicherheitsCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrivateDocService = TestBed.get(PrivateDocService);
    expect(service).toBeTruthy();
  });
});
