import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductListComponent } from './product-list.component';
import { ProductsServices } from '../services/product-service/products-services.service';
import { DatashareService } from '../services/datasshare/datashare.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

fdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productsService: ProductsServices;
  let dataShareService: DatashareService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [ProductsServices, DatashareService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsServices);
    router = TestBed.inject(Router);
    dataShareService = TestBed.inject(DatashareService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts = [{
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
    }];
    spyOn(productsService, 'getProducts').and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.allProducts).toEqual(mockProducts);
    expect(component.productsToShow).toEqual(mockProducts);
  });

  it('should apply filters on search', () => {
    component.allProducts = [
      {
        id: "trj-db",
        name: "Tarjeta de Débito",
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
      },
      {
        id: "trj-cdt",
        name: "Product diferent",
        description: "Tarjeta de consumo bajo la modalidad de credito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2024-03-12T00:00:00.000+00:00",
        date_revision: "2025-04-12T00:00:00.000+00:00"
      }
    ];

    spyOn(component, 'applyFilters').and.callThrough();

    component.searchProduct = 'Tarjeta';
    component.currentPage = 2;
    component.pageSize = 5;

    component.onSearch();

    expect(component.applyFilters).toHaveBeenCalled();
    expect(component.productsToShow.length).toEqual(2);
    expect(component.currentPage).toEqual(1);
  });

  it('should change page size and apply filters', () => {

    const event = { target: { value: 10 } };
    spyOn(component, 'applyFilters');

    component.onPageSizeChange(event);

    expect(component.currentPage).toEqual(1);
    expect(component.pageSize).toEqual(10);
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should toggle dropdown', () => {
    const event = { clientX: 100, clientY: 150 };
    const product = {
      id: "trj-cdt",
      name: "Product diferent",
      description: "Tarjeta de consumo bajo la modalidad de credito",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2024-03-12T00:00:00.000+00:00",
      date_revision: "2025-04-12T00:00:00.000+00:00"
    };
    
    component.toggleDropdown(event, product);

    expect(component.activeDropdown).toBeTrue();
    expect(component.menuStyle.display).toEqual('block');
    expect(component.menuStyle['left.px']).toEqual(30);
    expect(component.menuStyle['top.px']).toEqual(60);
    expect(component.productRecord).toEqual(product);
  });

  it('should close menu if click target is not icon-edit and dropdown is active', () => {

    const mockElement = document.createElement('div');
    spyOn(component, 'closeMenu');
    component.activeDropdown = true;

    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: mockElement });

    component.handleWindowClickEvent(event);

    expect(component.closeMenu).toHaveBeenCalled();
    expect(component.activeDropdown).toBeFalse();
  });

  it('should close menu', () => {

      component.menuStyle = {
        'display': 'block',
        'position': 'absolute',
        'left.px': 100,
        'top.px': 150
      };
    
      component.closeMenu();
    
      expect(component.menuStyle.display).toEqual('none');
  });

  it('should not close menu if click target is icon-edit and dropdown is active', () => {
    const mockElement = document.createElement('div');
    mockElement.classList.add('icon-edit');
    spyOn(component, 'closeMenu');
    component.activeDropdown = true;

    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: mockElement });

    expect(component.closeMenu).not.toHaveBeenCalled();
    expect(component.activeDropdown).toBeTrue();
  });

  it('should edit product', () => {

    spyOn(dataShareService, 'setEditData');
    spyOn(router, 'navigate');
    spyOn(component, 'closeMenu');

    component.productRecord = {
      id: "trj-db",
      name: "Tarjeta de Débito",
      description: "Tarjeta de consumo bajo la modalidad de credito",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-02-01T00:00:00.000+00:00",
      date_revision: "2024-02-01T00:00:00.000+00:00"
    };
    component.editProduct();

    expect(dataShareService.setEditData).toHaveBeenCalledWith(component.productRecord);
    expect(router.navigate).toHaveBeenCalledWith(['/', 'edit-product']);
    expect(component.closeMenu).toHaveBeenCalled();
  });

  it('should delete product option', () => {

    spyOn(component, 'closeMenu');
    spyOn(component, 'openModal');

    component.productRecord = {
      id: "trj-db",
      name: "Tarjeta de Débito",
      description: "Tarjeta de consumo bajo la modalidad de credito",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2023-02-01T00:00:00.000+00:00",
      date_revision: "2024-02-01T00:00:00.000+00:00"
    };
    component.deleteProductOption();

    expect(component.deleteDataId).toEqual(component.productRecord.id);
    expect(component.closeMenu).toHaveBeenCalled();
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should open modal', () => {
    component.openModal();

    expect(component.modalOpen).toBeTrue();
  });

  it('should close modal', () => {
    component.modalClosed();

    expect(component.modalOpen).toBeFalse();
  });

  it('should confirm modal and delete product', () => {
    spyOn(component, 'deleteProduct');

    component.modalConfirmed();

    expect(component.deleteProduct).toHaveBeenCalled();
  });

  it('should delete product', () => {

    const deleteProductId = '1';
    component.deleteDataId = deleteProductId;
    spyOn(productsService, 'deleteProduct').and.returnValue(of());
    spyOn(component, 'loadProducts');

    component.deleteProduct();

    expect(productsService.deleteProduct).toHaveBeenCalledWith(deleteProductId);
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should select page and apply filters', () => {
    const totalPagesLength = 5;
    component.currentPage = 1;
    const spy = spyOnProperty(component, 'totalPages', 'get').and.returnValue(Array.from({ length: totalPagesLength }, (_, i) => i + 1));
    spyOn(component, 'applyFilters');
  
    component.selectPage(2);
  
    expect(component.currentPage).toEqual(2);
    expect(component.applyFilters).toHaveBeenCalled();
  });
});