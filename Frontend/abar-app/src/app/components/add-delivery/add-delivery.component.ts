import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../../services/order-service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from '../order/order.component';
import { WarehouseEmployeeService } from '../../../services/warehouse-employee-service/warehouse-employee.service';

@Component({
  selector: 'app-add-delivery',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.scss'
})
export class AddDeliveryComponent implements OnInit{

  orders: Order[] = []
  selectedId: number = 0
  checkboxes: { [key: number]: boolean } = {}

  constructor(private orderService: OrderService, private warehouseEmployeeService: WarehouseEmployeeService){}

  ngOnInit(){
    this.orderService.getNewOrders().subscribe(
      (response) => this.orders = response
    )

    this.warehouseEmployeeService.employeeId$.subscribe(
      (response) => this.selectedId = response
    )
  }

  createDelivery(){
    const checkedKeys = Object.keys(this.checkboxes).filter(k => this.checkboxes[+k]).map(k => +k)
    this.orderService.sendOrdersToTask(this.selectedId, checkedKeys)
  }


}
