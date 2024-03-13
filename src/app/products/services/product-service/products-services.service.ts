
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from '../../product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsServices {

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'authorId': 1065884
  });

  private _baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'

  getProducts() {
    return this.http.get<Product[]>(this._baseUrl, { headers: this.headers });
  }

  createProduct(body: any) {
    return this.http.post<Product>(this._baseUrl, body, { headers: this.headers });
  }

  updateProduct(body: any) {
    return this.http.put<Product>(this._baseUrl, body, { headers: this.headers });
  }

  deleteProduct(id: string) {
    let params = new HttpParams();
    params = params.set('id', id)
    return this.http.delete(this._baseUrl, { responseType: 'text', headers: this.headers, params });
  }
  
  isProductExist(id: string){
    let params = new HttpParams();
    params = params.set('id', id)
    return this.http.get<Boolean>(`${this._baseUrl}/verification`, { headers: this.headers, params });
  }

}
