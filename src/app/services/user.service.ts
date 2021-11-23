import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../model/user.model";
import {Garage} from "../model/garage.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8000/api/admin/users');
  }
  getOne(): Observable<User>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.get<User>('http://localhost:8000/api/user/show', { headers });
  }

  editUser(id: number, user: any): any{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.patch('http://localhost:8000/api/user/edit/' + id, user, { headers });
  }

  addUser(user: User): Observable<User>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.post<User>('http://localhost:8000/api/register', user, { headers})
  }

  //Admin
  getInfos(){
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.get('http://localhost:8000/api/admin/infos', {headers})
  }

  deleteUser(id: number){
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.delete('http://localhost:8000/api/admin/deleteUser/'+id, {headers})
  }
}
