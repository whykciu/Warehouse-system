import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { WarehouseEmployeeService } from '../../services/warehouse-employee-service/warehouse-employee.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeExistsGuard implements CanActivate {
  constructor(private router: Router, private employeeService: WarehouseEmployeeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const id = route.paramMap.get('id');

    if (!isNaN(+id!)) {
      return this.employeeService.doesEmployeeExist(+id!).pipe(
        map((response) => {
          if (response === 'True') {
            console.log('Employee exists');
            return true;
          } else {
            console.log('Employee not exists');
            return this.router.createUrlTree(['/not-found']);
          }
        })
      )
    } else {
      console.log('Invalid ID');
      return this.router.createUrlTree(['/not-found'])
    }
  }
}