import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { FormProductComponent } from '../form-product/form-product.component';
import { Product } from '../product.interface';
import { ProductsServices } from '../services/product-service/products-services.service';

import { CreateComponent } from './create.component';

fdescribe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsServices>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const productServiceSpyObj = jasmine.createSpyObj('ProductsServices', ['createProduct']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ CreateComponent, FormProductComponent  ],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ProductsServices, useValue: productServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        DatePipe
      ]
    })
    .compileComponents();

    productServiceSpy = TestBed.inject(ProductsServices) as jasmine.SpyObj<ProductsServices>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call productService.createProduct and navigate to list-products on form submission', () => {
    const product: Product = {
      id: "trj-db",
      name: "Tarjetas de Débito",
      description: "Tarjeta de consumo bajo la modalidad de credito",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-02-01T00:00:00.000+00:00",
      date_revision: "2024-02-01T00:00:00.000+00:00"
    };;

    productServiceSpy.createProduct.and.returnValue(of());

    component.onSubmit(product);

    expect(productServiceSpy.createProduct).toHaveBeenCalledWith(product);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/', 'list-products']);

  });
});
