import { TestBed } from '@angular/core/testing';

import { RepuestoRevisionService } from './repuesto-revision.service';

describe('RepuestoRevisionService', () => {
  let service: RepuestoRevisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepuestoRevisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
