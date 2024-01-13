import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../../services/order-service/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-add-delivery',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-delivery.component.html',
  styleUrl: './add-delivery.component.scss'
})
export class AddDeliveryComponent implements OnInit{

  orders: Order[] = []
  checkboxes: { [key: number]: boolean } = {}

  constructor(private orderService: OrderService){}

  ngOnInit(){
    this.orderService.getNewOrders().subscribe(
      (response) => this.orders = response
    )
  }

  createDelivery(){

  }


}
