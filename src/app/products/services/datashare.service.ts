import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product.interface';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  private productData = new BehaviorSubject<any>(null);
  productData$ = this.productData.asObservable();

  constructor() {}

  setDatosEditar(product: Product) {
    this.productData.next(product);
  }
}
