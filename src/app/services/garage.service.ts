import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Garage} from "../model/garage.model";

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private http: HttpClient) { }

  getAllGarages(): Observable<Garage[]>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.get<Garage[]>('http://localhost:8000/api/admin/garages', { headers})
  }

  getGarages(): Observable<Garage[]>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.get<Garage[]>('http://localhost:8000/api/garage',  { headers })
  }

  addGarage(garage: Garage): Observable<Garage>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.post<Garage>('http://localhost:8000/api/garage/new', garage, { headers })
  }

  editGarage(garage: Garage, id: number): Observable<Garage>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.patch<Garage>('http://localhost:8000/api/garage/edit/' +id, garage, { headers })
  }

  deleteGarage(id: number){
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return this.http.delete('http://localhost:8000/api/garage/delete/'+id, { headers })
  }
}
