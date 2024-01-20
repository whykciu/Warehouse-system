import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { deliveryExistsGuard } from './delivery-exists.guard';

describe('deliveryExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => deliveryExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
