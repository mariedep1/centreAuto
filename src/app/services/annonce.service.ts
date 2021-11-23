import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Car} from "../model/car.model";



@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  public cars: Car[] = [];
  constructor(private http: HttpClient) {}

    getAll(): Observable<Car[]>{
      return this.http.get<Car[]>('http://localhost:8000/api/ad');
    }
    getOne(id: number): Observable<Car>{
      return this.http.get<Car>('http://localhost:8000/api/ad/show/' + id);
    }
    getAllBrands(): Observable<any>{
      return this.http.get<any>('http://localhost:8000/api/brand');
    }
    getModelsByBrand(brand: number): Observable<any>{
      return this.http.get<any>('http://localhost:8000/api/model/' + brand);
    }
    getAllFuels(): Observable<any>{
      return this.http.get<any>('http://localhost:8000/api/fuel');
    }
    addCar(car: Car): Observable<Car>{
      const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
      return this.http.post<Car>('http://localhost:8000/api/ad/new', car, { headers });
    }

    getCarsByUser(): Observable<any>{
      const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
      return this.http.get<any>('http://localhost:8000/api/ad/user', { headers } );
    }

    editCar(id: number, car: Car): Observable<Car>{
      const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
      return this.http.patch<Car>('http://localhost:8000/api/ad/edit/'+id, car,{ headers } );
    }

    deleteCar(id: number): Observable<Car>{
    const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
     return this.http.delete<Car>(`http://localhost:8000/api/ad/delete/`+id, { headers });
    }

    deleteImage(id: number): Observable<any>{
      const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
      return this.http.delete<any>(`http://localhost:8000/api/photo/delete/`+id, { headers });
    }
    addImage(image: any): Observable<any>{
      const headers = { Authorization: 'Bearer ' + sessionStorage.getItem('token') };
      return this.http.post<any>('http://localhost:8000/api/photo/new', image, { headers })
    }
    getBySearchBar(search: any):Observable<Car[]>{
    return this.http.post<Car[]>('http://localhost:8000/api/ad/search', search)
    }

    setCurrentCarSearch(cars: Car[]){
        this.cars = cars;
    }

    getCurrentCarSearch(){
      return this.cars;
    }

    clearCurrentCars(){
        this.cars = [];
    }

}
