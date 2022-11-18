import { TestBed } from '@angular/core/testing';

import { VehiculoRevisionService } from './vehiculo-revision.service';

describe('VehiculoRevisionService', () => {
  let service: VehiculoRevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoRevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
