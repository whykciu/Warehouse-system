import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../app/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private getTasksUrl = 'http://127.0.0.1:8000/users/employees/warehouse/'

  constructor(private http: HttpClient) {}

  getTasks(id: string) : Observable<Task[]>{
    return this.http.get<Task[]>(this.getTasksUrl + id + '/tasks/')
  }

}
