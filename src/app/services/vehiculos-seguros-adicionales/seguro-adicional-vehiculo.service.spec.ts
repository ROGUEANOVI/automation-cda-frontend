import { TestBed } from '@angular/core/testing';

import { SeguroAdicionalVehiculoService } from './seguro-adicional-vehiculo.service';

describe('SeguroAdicionalVehiculoService', () => {
  let service: SeguroAdicionalVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguroAdicionalVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
