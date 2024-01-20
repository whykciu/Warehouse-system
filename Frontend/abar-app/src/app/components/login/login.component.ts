import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { Role } from '../../interfaces/role';
import { LoginResponse } from '../../interfaces/login-response';
import { Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginResponse: LoginResponse = {id: 0, pk: 0, result: false, role: Role.CLI, username: ''};
    
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar){}
    
  username: string = '';
  password: string = '';

  login(){
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.result === 'true'){
          this.loginResponse = response
          this.authService.setUser(this.loginResponse)
          this.showLoginSuccesPrompt()
          this.router.navigate(['/'])
        } else {
          this.showLoginFailedPrompt()
        }
      }
    )
  }

  private showLoginSuccesPrompt() {
    let user = localStorage.getItem('user')
    this.snackBar.open(`Login success. Welcome ${ user }`, 'Close', {
      duration: 3000, 
    })
  }

  private showLoginFailedPrompt() {
    this.snackBar.open('Login failed. Please try again.', 'Close', {
      duration: 3000, 
    })
  }

}
