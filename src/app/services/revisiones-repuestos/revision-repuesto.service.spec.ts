import { TestBed } from '@angular/core/testing';

import { RevisionRepuestoService } from './revision-repuesto.service';

describe('RevisionRepuestoService', () => {
  let service: RevisionRepuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionRepuestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
