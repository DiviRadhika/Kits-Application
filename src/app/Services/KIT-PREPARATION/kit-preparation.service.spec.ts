import { TestBed } from '@angular/core/testing';

import { KitPreparationService } from './kit-preparation.service';

describe('KitPreparationService', () => {
  let service: KitPreparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KitPreparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
