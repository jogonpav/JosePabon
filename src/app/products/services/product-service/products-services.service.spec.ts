import { TestBed } from '@angular/core/testing';

import { ProductsServices } from './products-services.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../../product.interface';

fdescribe('ProductsServices', () => {
  let productsServices: ProductsServices;
  let httpController: HttpTestingController;
  let urlAPI = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductsServices], 
    });
    productsServices = TestBed.inject(ProductsServices);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productsServices).toBeTruthy();
  });

  describe('tests for getProducts', ()=> {
    it('should return a product list', (doneFn)=>{
      const mockData: Product[] = [
          {
              id: "trj-db",
              name: "Tarjetas de Débito",
              description: "Tarjeta de consumo bajo la modalidad de credito",
              logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
              date_release: "2023-02-01T00:00:00.000+00:00",
              date_revision: "2024-02-01T00:00:00.000+00:00"
          },
          {
              id: "trj-cdt",
              name: "Tarjeta de crédito",
              description: "Tarjeta de consumo bajo la modalidad de credito",
              logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
              date_release: "2024-03-12T00:00:00.000+00:00",
              date_revision: "2025-04-12T00:00:00.000+00:00"
          }
      ];
      productsServices.getProducts().subscribe((data)=>{ 
        expect(data.length).toEqual(mockData.length)
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne(urlAPI);
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for createProduts', ()=> {
    it('should return a new product', (doneFn)=>{
      const mockData: Product =
      {
        id: "trj-db",
        name: "Tarjetas de Débito",
        description: "Tarjeta de consumo bajo la modalidad de credito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
      };
      productsServices.createProduct(mockData).subscribe((data)=>{ 
        expect(data).toEqual(mockData);
        doneFn();
      });
      const req = httpController.expectOne(urlAPI);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');
      httpController.verify();
    })
  });

  describe('tests for updateProduts', ()=> {
    it('should return a updated product', (doneFn)=>{
      const mockData: Product =
      {
        id: "trj-db",
        name: "Tarjetas de Débito",
        description: "Tarjeta de consumo bajo la modalidad de credito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
      };
      productsServices.updateProduct(mockData).subscribe((data)=>{ 
        expect(data).toEqual(mockData);
        doneFn();
      });
      const req = httpController.expectOne(urlAPI);
      req.flush(mockData);
      expect(req.request.method).toEqual('PUT');
      httpController.verify();
    })
  });

  describe('tests for deleteProducts', ()=> {
    it('should return a updated product', (doneFn)=>{
      const mockData ='Product successfully removed';
      const id = 'trj-db'
      productsServices.deleteProduct(id).subscribe((data)=>{
        expect(data).toEqual('Product successfully removed');
        doneFn();
      });
      const req = httpController.expectOne(`${urlAPI}?id=trj-db`);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
      httpController.verify();
    })
  });

});
