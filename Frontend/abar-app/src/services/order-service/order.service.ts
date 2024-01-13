import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../app/interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private orderUrl = 'http://127.0.0.1:8000/warehouse/orders/'

  constructor(private http: HttpClient) { }

  private data: Order[] = []

  getNewOrders() :  Observable<Order[]>{
    return this.http.get<Order[]>(this.orderUrl)
  }
}
