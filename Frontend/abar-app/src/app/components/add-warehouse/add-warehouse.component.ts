import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WarehouseTaskService } from '../../../services/warehouse-task-service/warehouse-task.service';
import { WarehouseEmployeeService } from '../../../services/warehouse-employee-service/warehouse-employee.service';
import { WarehouseTask } from '../../interfaces/warehouse-task';

@Component({
  selector: 'app-add-warehouse',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.scss'
})
export class AddWarehouseComponent implements OnInit{

  selectedTaskId: number = 0
  selectedEmployeeId: number = 0
  warehouseTasks: WarehouseTask[] = []

  constructor(private warehouseTaskService: WarehouseTaskService, private warehouseEmployeeService: WarehouseEmployeeService){}

  ngOnInit() {
    this.warehouseTaskService.getWarehouseTasks().subscribe(
      (response) => {
        this.warehouseTasks = response
        if(this.warehouseTasks.length > 0) this.selectedTaskId = this.warehouseTasks[0].pk
      }
    )

    this.warehouseEmployeeService.employeeId$.subscribe(
      (response) => this.selectedEmployeeId = response
    )
  }

  createWarehouseTask(){
    this.warehouseTaskService.sendWarehouseTask(this.selectedEmployeeId, this.selectedTaskId)
  }


}
