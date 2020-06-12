import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './catagory.model';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/categories';
  getCatagory() {
    return this.http.get(this.baseURL) ;
  }
  insertCatagory( cat: Category) {
    return this.http.post(this.baseURL, cat);
  }
  updateCatagory(cat: Category) {
    return this.http.put(this.baseURL + `/${cat._id}`, cat);
  }
  deleteCatagory(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  getcatid(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }

}
