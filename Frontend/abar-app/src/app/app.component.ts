import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { OrderComponent } from './components/order/order.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { AddCustomComponent } from './components/add-custom/add-custom.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeliveryDetailsComponent } from './components/delivery-details/delivery-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    OrderComponent, 
    AddTaskComponent, 
    AddDeliveryComponent,
    AddWarehouseComponent,
    AddCustomComponent,
    TasksComponent,
    DeliveryDetailsComponent,
    LoginComponent,
    RegisterComponent,
    OrderHistoryComponent,
    NotFoundComponent,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'abar-app';
}
