import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TaskService } from '../../../services/task-service/task.service';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  constructor(private authService: AuthService, private taskService: TaskService, private router: Router, private snackBar: MatSnackBar){}

  id: number = 0
  tasks: Task[] = []
  groupedData: { [key: string]: Task[] } = {}

  ngOnInit(){
    this.id = this.authService.getAccountId()

    this.taskService.getTasks(this.id.toString()).subscribe(
      r => {
        this.tasks = r
        this.groupedData = this.tasks.reduce((acc: { [key: string]: Task[] }, obj) => {
          const key = obj.status;
        
          if (!acc[key]) {
            acc[key] = [];
          }
        
          acc[key].push(obj);
        
          return acc;
        }, {});
      }
    )
  }

  getImageSource(type: string){
    switch(type){
      case 'DEL':
        return '../assets/img/delivery.png'
      case 'WRH':
        return '../assets/img/warehouse.png'
      case 'CUS':
        return '../assets/img/custom.png'
      default:
        return '../assets/img/custom.png'
    }
  }

  navigate(type: string, id: number){
    switch(type){
      case 'DEL':
        this.router.navigate(['/delivery', id, 'details']);
        break;
      case 'WRH':
        this.router.navigate(['/not-found']);
        break;
      case 'CUS':
        this.router.navigate(['/not-found']);
        break;
      default:
        this.router.navigate(['/delivery', id, 'details']);
        break;
    }
  }

  startTask(id: number, type: string){
    this.taskService.startTask(id, type).subscribe(r => console.log(r)) 
    this.snackBar.open('Task started', 'Close', {
      duration: 1500, 
    })
    location.reload()
  }

  endTask(id: number, type: string){
    this.taskService.endTask(id, type).subscribe(r => console.log(r)) 
    this.snackBar.open('Task ended', 'Close', {
      duration: 1500, 
    })
    location.reload()
  }

}
