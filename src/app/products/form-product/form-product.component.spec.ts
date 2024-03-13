import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

import { FormProductComponent } from './form-product.component';
import { ProductsServices } from '../services/product-service/products-services.service';

fdescribe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsServices>;

  beforeEach(async () => {
    const productServiceMock = jasmine.createSpyObj('ProductsServices', ['isProductExist']);
    productServiceMock.isProductExist.and.returnValue(of(false));

    await TestBed.configureTestingModule({
      declarations: [FormProductComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        DatePipe,
        FormBuilder,
        { provide: ProductsServices, useValue: productServiceMock }
      ]
    })
    .compileComponents();

    productServiceSpy = TestBed.inject(ProductsServices) as jasmine.SpyObj<ProductsServices>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with proper controls', () => {
    expect(component.myForm.contains('id')).toBeTruthy();
    expect(component.myForm.contains('description')).toBeTruthy();
    expect(component.myForm.contains('date_release')).toBeTruthy();
    expect(component.myForm.contains('name')).toBeTruthy();
    expect(component.myForm.contains('logo')).toBeTruthy();
    expect(component.myForm.contains('date_revision')).toBeTruthy();
  });

  it('should patch form values when in edit mode', () => {
    component.editMode = true;
    component.productData = {
      id: '123',
      description: 'Test Description',
      date_release: '2024-03-13',
      name: 'Test Product',
      logo: 'test-logo',
      date_revision: '2025-03-13'
    };
    component.ngOnInit();

    expect(component.myForm.value.id).toEqual('123');
    expect(component.myForm.value.description).toEqual('Test Description');
    expect(component.myForm.value.date_release).toEqual('2024-03-13');
    expect(component.myForm.value.name).toEqual('Test Product');
    expect(component.myForm.value.logo).toEqual('test-logo');
    expect(component.myForm.value.date_revision).toEqual('2025-03-13');
  });

  it('should call onSubmitEvent.emit when form is submitted', () => {
    spyOn(component.onSubmitEvent, 'emit');
    component.myForm.patchValue({
      id: '123',
      description: 'Test Description',
      date_release: '2024-03-13',
      name: 'Test Product',
      logo: 'test-logo',
      date_revision: '2025-03-13'
    });
    component.onSubmit();
    expect(component.onSubmitEvent.emit).toHaveBeenCalledOnceWith(component.myForm.value);
  });

  it('should reset the form and mark it as untouched when editMode is false', () => {
    component.editMode = false;
    spyOn(window, 'alert');
  
    component.myForm.setValue({
      id: '123',
      description: 'Test Description',
      date_release: '2024-03-13',
      name: 'Test Product',
      logo: 'test-logo',
      date_revision: '2025-03-13'
    });
  
    component.onReset();
  
    expect(component.myForm.value).toEqual({
      id: null,
      description: null,
      date_release: null,
      name: null,
      logo: null,
      date_revision: null
    });
    expect(component.myForm.untouched).toBe(true);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should display an alert and not reset the form when editMode is true', () => {
    component.editMode = true;
    spyOn(window, 'alert'); 
  
    component.onReset();
  
    expect(component.myForm.untouched).toBe(true);
    expect(window.alert).toHaveBeenCalledWith("No puedes usar Reset al editar un producto");
  });

  describe('test for getFieldError', () => {
    it('should return null when field control does not exist', () => {
      const nonExistentField = 'nonExistentField';
  
      const result = component.getFieldError(nonExistentField);
  
      expect(result).toBeNull();
    });
  
    it('should return appropriate error messages for different error types', () => {

      const errorsTestData = [
        { field: 'name', error: { required: true }, expectedMessage: 'Este campo es requerido!' },
        { field: 'name', error: { minlength: { requiredLength: 5, actualLength: 3 } }, expectedMessage: 'Mínimo 5 caratacteres.' },
        { field: 'description', error: { maxlength: { requiredLength: 200, actualLength: 250 } }, expectedMessage: 'Máximo 200 caratacteres.' },
        { field: 'date_release', error: { releaseDateInvalid: true }, expectedMessage: 'La fecha de liberación debe ser mayor o igual a la fecha actual' },
        { field: 'id', error: { productIdExist: true }, expectedMessage: 'Id existente' }
      ];
  
      errorsTestData.forEach(data => {
        component.myForm.get(data.field)?.setErrors(data.error);
  
        const result = component.getFieldError(data.field);
  
        expect(result).toBe(data.expectedMessage);
      });
    });
  });

});