import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [ RouterLink, RouterLinkActive, CommonModule ] 
})
export class NavComponent {

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }
  
  isLoggedInCheck(){
    return this.authService.isLoggedIn()
  }

  isWarehouseEmployeeCheck(){
    return this.authService.isWarehouseEmployee()
  }

  isOfficeEmployeeCheck(){
    return this.authService.isOfficeEmployee()
  }

  isClientCheck(){
    return this.authService.isClient()
  }

  isLoggedInWarehouseEmployee(){
    return this.isLoggedInCheck() && this.isWarehouseEmployeeCheck()
  }

  isLoggedInOfficeEmployee(){
    return this.isLoggedInCheck() && this.isOfficeEmployeeCheck()
  }

  isLoggedInClient(){
    return this.isLoggedInCheck() && this.isClientCheck()
  }

  logout(){
    this.authService.logout()
    this.snackBar.open('You have signed out', 'Close', {
      duration: 1500, 
    })
  }
  
}
