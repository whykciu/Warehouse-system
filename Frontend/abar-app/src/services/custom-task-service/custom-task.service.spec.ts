import { TestBed } from '@angular/core/testing';

import { CustomTaskService } from './custom-task.service';

describe('CustomTaskService', () => {
  let service: CustomTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
