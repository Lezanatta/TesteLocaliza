import { TestBed } from '@angular/core/testing';

import { CobrancasService } from './cobrancas.service';

describe('CobrancasService', () => {
  let service: CobrancasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CobrancasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
