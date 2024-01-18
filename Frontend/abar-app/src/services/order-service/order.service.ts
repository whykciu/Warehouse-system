import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../app/interfaces/order';
import { Observable } from 'rxjs';

class ResponseOrder{
  constructor(public pkEmployee: number, public orderIds: number[]) {}
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private orderUrl = 'http://127.0.0.1:8000/warehouse/orders/'
  private taskUrl = 'http://127.0.0.1:8000/warehouse/task/delivery/send/'

  constructor(private http: HttpClient) { }

  private data: Order[] = []

  getNewOrders() :  Observable<Order[]>{
    return this.http.get<Order[]>(this.orderUrl)
  }

  sendOrdersToTask(employeeId: number, orders: number[]){
    let response = null

    if(orders.length > 0)  {
      response = new ResponseOrder(employeeId, orders)
    }

    if(response != null){
      const jsonData = JSON.stringify(response)
      this.http.post(this.taskUrl, jsonData).subscribe(
        r => console.log('Data sent successfully:', r)
      )
    }
  }

}
