import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DatashareService } from '../services/datasshare/datashare.service';
import { ProductsServices } from '../services/product-service/products-services.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../product.interface';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsServices>;
  let dataShareServiceSpy: jasmine.SpyObj<DatashareService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: "trj-db",
    name: "Tarjetas de Débito",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
  };

  beforeEach(async () => {
    const productServiceSpyObj = jasmine.createSpyObj('ProductsServices', ['updateProduct']);
    const dataShareServiceSpyObj = jasmine.createSpyObj('DatashareService', ['productData$']);

    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        DatePipe,
        { provide: ProductsServices, useValue: productServiceSpyObj },
        { provide: DatashareService, useValue: dataShareServiceSpyObj }
      ]
    })
    .compileComponents();

    productServiceSpy = TestBed.inject(ProductsServices) as jasmine.SpyObj<ProductsServices>;
    dataShareServiceSpy = TestBed.inject(DatashareService) as jasmine.SpyObj<DatashareService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call productService.updateProduct on form submission', () => {
    productServiceSpy.updateProduct.and.returnValue(of());
    component.onSubmit(mockProduct);
    expect(productServiceSpy.updateProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should navigate to list-products on successful form submission', () => {
    productServiceSpy.updateProduct.and.returnValue(of());
    component.onSubmit(mockProduct);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/', 'list-products']);
  });

  it('should log error on form submission failure', () => {
    const errorMessage = 'Test Error';
    productServiceSpy.updateProduct.and.returnValue(new Observable((observer) => {
      observer.error(errorMessage);
    }));
    spyOn(console, 'error');
    component.onSubmit(mockProduct);
    expect(console.error).toHaveBeenCalledWith('Error al editar producto:', errorMessage);
  });
});