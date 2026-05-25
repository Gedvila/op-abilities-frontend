import { TestBed } from '@angular/core/testing';

import { DamageKindService } from './damage-kind.service';

describe('DamageKindService', () => {
  let service: DamageKindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DamageKindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
