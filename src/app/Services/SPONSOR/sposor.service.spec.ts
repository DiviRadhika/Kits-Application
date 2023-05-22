import { TestBed } from '@angular/core/testing';

import { SposorService } from './sposor.service';

describe('SposorService', () => {
  let service: SposorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SposorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
