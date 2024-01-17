import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseTask } from '../../app/interfaces/warehouse-task';

class ResponseWarehouseTask{
  constructor(public pkEmployee: number, public taskId: number) {}
}

@Injectable({
  providedIn: 'root'
})
export class WarehouseTaskService {

  private getWarehouseTaskUrl = 'http://127.0.0.1:8000/warehouse/task/warehouse-task/'
  private sendWarehouseTaskUrl = 'http://127.0.0.1:8000/warehouse/task/warehouse-task/send/'

  constructor(private http: HttpClient) {}

  getWarehouseTasks(): Observable<WarehouseTask[]>{
    return this.http.get<WarehouseTask[]>(this.getWarehouseTaskUrl)
  }

  sendWarehouseTask(employeeId: number, warehouseTaskId: number){
    let response = new ResponseWarehouseTask(employeeId, warehouseTaskId)
    const jsonData = JSON.stringify(response)
    this.http.post(this.sendWarehouseTaskUrl, jsonData).subscribe(
      r => console.log('Data sent successfully:', r)
    )
  }

}
