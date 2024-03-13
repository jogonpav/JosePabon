import { TestBed } from '@angular/core/testing';
import { Product } from '../../product.interface';

import { DatashareService } from './datashare.service';

fdescribe('DatashareService', () => {
  let service: DatashareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatashareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for set shared data', () => {
    it('should emit product data when setEditData is called', () => {
      const product: Product =
      {
        id: "trj-db",
        name: "Tarjetas de Débito",
        description: "Tarjeta de consumo bajo la modalidad de credito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
      };
      let emittedProduct: Product | null = null;;
      service.setEditData(product);
      service.productData$.subscribe(data => {
        emittedProduct = data;
        expect(emittedProduct).toEqual(product);
      });
    });
  });
});
