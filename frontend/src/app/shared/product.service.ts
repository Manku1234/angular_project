import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'http://localhost:3000/products';
  getProduct() {
    return this.http.get(this.baseURL) ;
  }
  insertProduct( product: Product) {
    return this.http.post(this.baseURL, product);
  }
  updateProduct(product: Product) {
    return this.http.put(this.baseURL + `/${product._id}`, product);
  }
  deleteProduct(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  getproductid(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }

}
