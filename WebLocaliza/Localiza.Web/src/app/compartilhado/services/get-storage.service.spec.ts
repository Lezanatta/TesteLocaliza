import { TestBed } from '@angular/core/testing';

import { GetStorageService } from './get-storage.service';

describe('GetStorageService', () => {
  let service: GetStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
