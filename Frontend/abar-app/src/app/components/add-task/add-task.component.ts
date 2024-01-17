import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WarehouseEmployeeService } from '../../../services/warehouse-employee-service/warehouse-employee.service';
import { User } from '../../interfaces/user';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit{

  constructor(private warehouseEmployeeSerive: WarehouseEmployeeService){}

  employees: User[] = []
  selected: number = 0

  ngOnInit(){
    this.warehouseEmployeeSerive.getEmployees().subscribe(
      (response) => {
        this.employees = response
        if(this.employees.length > 0) this.selected = this.employees[0].pk
      }
    )
  }

  setEmployeeId() {
    this.warehouseEmployeeSerive.setEmployeeId(this.selected);
  }


}
