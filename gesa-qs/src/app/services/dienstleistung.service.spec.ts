import { TestBed } from '@angular/core/testing';

import { DienstleistungService } from './dienstleistung.service';

describe('DienstleistungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DienstleistungService = TestBed.get(DienstleistungService);
    expect(service).toBeTruthy();
  });
});
