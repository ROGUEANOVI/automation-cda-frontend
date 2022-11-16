import { TestBed } from '@angular/core/testing';

import { SeguroAdicionalService } from './seguro-adicional.service';

describe('SeguroAdicionalService', () => {
  let service: SeguroAdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguroAdicionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
