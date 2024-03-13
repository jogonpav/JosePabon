import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.interface';

import { ProductsServices } from '../services/products-services.service';

@Component({
  selector: 'app-create2',
  templateUrl: './create2.component.html',
  styleUrls: ['./create2.component.css']
})
export class Create2Component {

  constructor(
    private poductsSevice: ProductsServices,
    private router: Router,
  ) { }



  onSubmit(product: Product) {
    this.poductsSevice.createProduct(product).subscribe(() => {
      this.toNavigate()
    },(error) => {
      console.error('Error al crear producto:', error);
    })
  }

  toNavigate() {
    this.router.navigate(['/', 'list-products'])
  }

}

