import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  username: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  address: string = '';
  phoneNumber: string = '';

  showRegisterPrompt(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000
    })
  }

  register(){
    this.authService.register(this.username, this.password, this.name, this.surname, this.address, this.phoneNumber).subscribe(
      response => {
        if (response.result === 'true'){
          this.showRegisterPrompt(response.message)
          this.router.navigate(['/login'])
        } else {
          this.showRegisterPrompt(response.message)
        }
      }
    )
  }
}
