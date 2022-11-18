import { TestBed } from '@angular/core/testing';

import { UsuarioVehiculoService } from './usuario-vehiculo.service';

describe('UsuarioVehiculoService', () => {
  let service: UsuarioVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
