import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';
import { AddCustomComponent } from './components/add-custom/add-custom.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployeeExistsGuard } from './guards/employee-exists.guard';
import { DeliveryDetailsComponent } from './components/delivery-details/delivery-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'order', component: OrderComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add', component: AddTaskComponent },
    { path: 'add/delivery', component: AddDeliveryComponent },
    { path: 'add/warehouse', component: AddWarehouseComponent },
    { path: 'add/custom', component: AddCustomComponent },
    { path: 'warehouse-employee/tasks', component: TasksComponent},
    { path: 'delivery/:id/details', component: DeliveryDetailsComponent},
    { path: 'client/orders', component: OrderHistoryComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent },
]