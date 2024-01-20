import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../../services/order-service/order.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderItem } from '../../interfaces/order-item';

@Component({
  selector: 'app-delivery-details',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './delivery-details.component.html',
  styleUrl: './delivery-details.component.scss'
})
export class DeliveryDetailsComponent implements OnInit{

  constructor(private orderService: OrderService, private route: ActivatedRoute){}
  
  orders: Order[] = []
  selected: number = 0
  id: string = ''

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? ''
    })

    this.orderService.getOrdersForDelivery(this.id).subscribe(
      r => this.orders = r
    )
  }


}
