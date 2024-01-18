import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../app/interfaces/user';
import { Order } from '../../app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class WarehouseEmployeeService {

  private employeesUrl = 'http://127.0.0.1:8000/users/employees/warehouse/'
  
  private employeeIdSource = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient) {}

  employeeId$ = this.employeeIdSource.asObservable()

  getEmployees() :  Observable<User[]>{
    return this.http.get<User[]>(this.employeesUrl)
  }

  setEmployeeId(employeeId: number){
    this.employeeIdSource.next(employeeId)
  }

  doesEmployeeExist(employeeId: number): Observable<string>{
    return this.http.get(this.employeesUrl + employeeId + '/', { responseType: 'text' })
  }

}
