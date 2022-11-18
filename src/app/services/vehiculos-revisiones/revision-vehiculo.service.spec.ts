import { TestBed } from '@angular/core/testing';

import { RevisionVehiculoService } from './revision-vehiculo.service';

describe('RevisionVehiculoService', () => {
  let service: RevisionVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
