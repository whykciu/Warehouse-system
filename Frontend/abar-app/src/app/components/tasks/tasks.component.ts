import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TaskService } from '../../../services/task-service/task.service';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router){}

  id: string = ''
  tasks: Task[] = []

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? ''
    })

    this.taskService.getTasks(this.id).subscribe(
      r => this.tasks = r
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

}
