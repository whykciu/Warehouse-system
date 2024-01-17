import { Component, OnInit } from '@angular/core';
import { WarehouseEmployeeService } from '../../../services/warehouse-employee-service/warehouse-employee.service';
import { CustomTaskService } from '../../../services/custom-task-service/custom-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-custom',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-custom.component.html',
  styleUrl: './add-custom.component.scss'
})
export class AddCustomComponent implements OnInit{

  constructor(private warehouseEmployeeService: WarehouseEmployeeService, private customTaskService: CustomTaskService){}

  selectedEmployeeId: number = 0
  title: string = ''
  description: string = ''

  ngOnInit() {
    this.warehouseEmployeeService.employeeId$.subscribe(
      (response) => this.selectedEmployeeId = response
    )
  }

  createCustomTask(){
    this.customTaskService.sendCustomTask(this.selectedEmployeeId, this.title, this.description)
  }

}
