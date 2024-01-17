import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

class ResponseCustomTask{
  constructor(public pkEmployee: number, public title: string, public description: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class CustomTaskService {

  private sendCustomTaskUrl = 'http://127.0.0.1:8000/warehouse/task/custom-task/send/'

  constructor(private http: HttpClient) {}

  sendCustomTask(employeeId: number, title: string, description: string){
    let response = new ResponseCustomTask(employeeId, title, description)
    const jsonData = JSON.stringify(response)
    this.http.post(this.sendCustomTaskUrl, jsonData).subscribe(
      r => console.log('Data sent successfully:', r)
    )
  }

}
