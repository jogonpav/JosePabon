import { TestBed } from '@angular/core/testing';

import { ProductsServices } from './products-services.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('ProductsServices', () => {
  let productsServices: ProductsServices;
  let httpController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [ProductsServices], // Añade tu servicio a los providers
    });
    productsServices = TestBed.inject(ProductsServices);
  });

  it('should be created', () => {
    expect(productsServices).toBeTruthy();
  });

});
