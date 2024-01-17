import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../app/interfaces/user';
import { Order } from '../../app/interfaces/order';

class ResponseOrder{
  constructor(public pkEmployee: number, public orderIds: number[]) {}
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseEmployeeService {

  private employeesUrl = 'http://127.0.0.1:8000/users/employees/warehouse/'
  private taskUrl = 'http://127.0.0.1:8000/warehouse/task/delivery/send/'
  private employeeIdSource = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient) {}

  employees: User[] = []
  employeeId$ = this.employeeIdSource.asObservable()

  getEmployees() :  Observable<User[]>{
    return this.http.get<User[]>(this.employeesUrl)
  }

  setEmployeeId(employeeId: number){
    this.employeeIdSource.next(employeeId)
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
