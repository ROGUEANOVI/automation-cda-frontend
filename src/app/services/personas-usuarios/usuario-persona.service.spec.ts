import { TestBed } from '@angular/core/testing';

import { UsuarioPersonaService } from './usuario-persona.service';

describe('UsuarioPersonaService', () => {
  let service: UsuarioPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
