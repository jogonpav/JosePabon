import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.interface';
import { ProductsServices } from '../services/product-service/products-services.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(
    private productsSevice: ProductsServices,
    private router: Router,
  ) { }

  async onSubmit(product: Product) {   
    this.productsSevice.createProduct(product).subscribe(
      {
        next: ()=>this.toNavigate(),
        error: (error)=> console.error('Error al crear producto:', error)
      }
    );    
  }

  toNavigate() {
    this.router.navigate(['/', 'list-products'])
  }

}

