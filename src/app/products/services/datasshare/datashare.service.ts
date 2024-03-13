import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../product.interface';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  private _productData$ = new BehaviorSubject<any>(null);
  get productData$() {
    return this._productData$.asObservable();
  }

  setEditData(product: Product) {
    this._productData$.next(product);
  }
}
