import { TestBed } from '@angular/core/testing';

import { WarehouseTaskService } from './warehouse-task.service';

describe('WarehouseTaskService', () => {
  let service: WarehouseTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
