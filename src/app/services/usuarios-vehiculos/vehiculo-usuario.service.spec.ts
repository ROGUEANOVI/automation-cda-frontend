import { TestBed } from '@angular/core/testing';

import { VehiculoUsuarioService } from './vehiculo-usuario.service';

describe('VehiculoUsuarioService', () => {
  let service: VehiculoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
