import { TestBed } from '@angular/core/testing';

import { AddfavService } from './addfav.service';

describe('AddfavService', () => {
  let service: AddfavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddfavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
