import { Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddDeliveryComponent } from './components/add-delivery/add-delivery.component';
import { AddCustomComponent } from './components/add-custom/add-custom.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';


export const routes: Routes = [
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: 'order', component: OrderComponent },
    { path: 'add', component: AddTaskComponent },
    { path: 'add/delivery', component: AddDeliveryComponent },
    { path: 'add/warehouse', component: AddWarehouseComponent },
    { path: 'add/custom', component: AddCustomComponent },
    //{ path: '**', redirectTo: '/', pathMatch: 'full' },
]