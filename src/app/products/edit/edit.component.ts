import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product.interface';
import { DatashareService } from '../services/datashare.service';
import { ProductsServices } from '../services/products-services.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  editMode: boolean = true
  productData!: Product;

  constructor(
    private poductsSevice: ProductsServices,
    private datePipe: DatePipe,
    private router: Router,
    private dataShareService: DatashareService) {
    this.dataShareService.productData$.subscribe((data: Product) => {
      this.productData = data;
    });
  }

  onSubmit(product: Product) {
    this.poductsSevice.updateProduct(product).subscribe(() => {
      this.toNavigate()
    },(error) => {
      console.error('Error al editar producto:', error);
    })
  }

  toNavigate() {
    this.router.navigate(['/', 'list-products'])
  }

}
