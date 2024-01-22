import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../../services/order-service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from '../order/order.component';
import { WarehouseEmployeeService } from '../../../services/warehouse-employee-service/warehouse-employee.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  lastSelectedIndex: number = 0

  constructor(private orderService: OrderService, private warehouseEmployeeService: WarehouseEmployeeService, private router: Router, private snackBar: MatSnackBar){}

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
    this.snackBar.open('Delivery created', 'Close', {duration: 3000})
    this.router.navigate(['/add'])
  }

  lastSelected(index: number){
    this.lastSelectedIndex = index
  }

  calculateTotalPrice(order: Order): number{
    let total = 0
    order.orderItems.forEach(item => {
      total += item.product_price * item.quantity
    })
    return total
  }

}
