import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  constructor(private http: HttpClient, private router: Router) { }

  login(submittedData: any): Observable<any>{
    this.loggedIn = true;
    return this.http.post<any>('http://localhost:8000/api/login_check', submittedData);
  }

  refreshToken(token: string) {
    return this.http.post('http://localhost:8000/api/token/refresh', {
      refresh_token: token
    });
  }

  isAdmin(data: any){
    if(data.length == 2){
      sessionStorage.setItem('isAdmin', "true")
    }
  }

  getIsAdmin(){
    return sessionStorage.getItem('isAdmin')
  }


  setToken(token: any): any{
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', token);
  }
  getToken(): any{
    return sessionStorage.getItem('token');
  }
  setRefreshToken(refreshToken: any){
    sessionStorage.removeItem('refresh_token');
    sessionStorage.setItem('refresh_token', refreshToken);
}
  getRefreshToken(){
    return sessionStorage.getItem('refresh_token')
  }
  setLoggedUser(username: any): any{
    sessionStorage.setItem('username', username);
  }

  isLoggedIn(): any{
    return !!sessionStorage.getItem('token');
  }

  logOut(): any{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');
    this.loggedIn = false;
    window.location.replace('annonces');
  }
}
