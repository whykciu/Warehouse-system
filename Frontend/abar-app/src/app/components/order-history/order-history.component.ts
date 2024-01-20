import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order-service/order.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { Order } from '../../interfaces/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit{

  constructor(private orderService: OrderService, private authService: AuthService) { }

  orders: Order[] = []
  selected: number = 0

  ngOnInit(): void {
    this.orderService.getOrdersForClient(this.authService.getAccountId()).subscribe(
      data => {
        this.orders = data
      }
    )
  }

}
