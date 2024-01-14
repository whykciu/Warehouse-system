import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class WarehouseEmployeeService {

  private orderUrl = 'http://127.0.0.1:8000/users/employees/warehouse/'

  constructor(private http: HttpClient) { }

  employees: User[] = []

  getEmployees() :  Observable<User[]>{
    return this.http.get<User[]>(this.orderUrl)
  }

}
