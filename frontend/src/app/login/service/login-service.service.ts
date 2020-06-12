import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/login-model.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //readonly BaseURI = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  // getList(): Observable<LoginModel[]>{
  //   return this.http.get<LoginModel[]>(this.BaseURI + 'https://api.ipify.org?format=json');
  // }

  getList(): Observable<any[]>{
    return this.http.get<any[]>('https://api.ipify.org?format=json');
  }
}