import { TestBed } from '@angular/core/testing';

import { AddtoFavService } from './addto-fav.service';

describe('AddtoFavService', () => {
  let service: AddtoFavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddtoFavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
