import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../../app/interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sendLoginRequestUrl = "http://127.0.0.1:8000/users/login/" 

  constructor(private http: HttpClient) { }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable()

  login(username: string, password: string): Observable<any>{
    return this.http.post(this.sendLoginRequestUrl, { username, password })
  }

  logout(){
    this.isLoggedInSubject.next(false)
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('user_id')
    localStorage.removeItem('acc_id')
  }

  setUser(loginResponse: LoginResponse){
    this.isLoggedInSubject.next(true)
    localStorage.setItem('user', loginResponse.username)
    localStorage.setItem('role', loginResponse.role.toString())
    localStorage.setItem('user_id', loginResponse.id.toString())
    localStorage.setItem('acc_id', loginResponse.pk.toString())
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  isWarehouseEmployee(): boolean {
    return localStorage.getItem('role') === 'WAR'
  }

  isClient(): boolean {
    return localStorage.getItem('role') === 'CLI'
  }

  isOfficeEmployee(): boolean {
    return localStorage.getItem('role') === 'OFF'
  }

}
