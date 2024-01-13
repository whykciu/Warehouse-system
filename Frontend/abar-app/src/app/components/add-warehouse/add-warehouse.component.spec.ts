import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseComponent } from './add-warehouse.component';

describe('AddWarehouseComponent', () => {
  let component: AddWarehouseComponent;
  let fixture: ComponentFixture<AddWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWarehouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
