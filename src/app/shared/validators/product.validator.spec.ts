import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AbstractControl, FormControl } from '@angular/forms';
import { ReleaseDateValidator } from './product.validators';

fdescribe('ReleaseDateValidator', () => {
  let control: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });
  });

  it('should return null if date is valid', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); 
    control = new FormControl(futureDate.toISOString().split('T')[0]);
    const result = ReleaseDateValidator(control);
    expect(result).toBeNull();
  });

  it('should return validation error if date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); 
    control = new FormControl(pastDate.toISOString().split('T')[0]);
    const result = ReleaseDateValidator(control);
    expect(result).toEqual({ 'releaseDateInvalid': true });
  });

  it('should return null if control value is null', () => {
    control = new FormControl(null);
    const result = ReleaseDateValidator(control);
    expect(result).toBeNull();
  });
});