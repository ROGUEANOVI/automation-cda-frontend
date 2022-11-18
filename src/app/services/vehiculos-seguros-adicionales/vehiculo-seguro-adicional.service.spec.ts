import { TestBed } from '@angular/core/testing';

import { VehiculoSeguroAdicionalService } from './vehiculo-seguro-adicional.service';

describe('VehiculoSeguroAdicionalService', () => {
  let service: VehiculoSeguroAdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoSeguroAdicionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
