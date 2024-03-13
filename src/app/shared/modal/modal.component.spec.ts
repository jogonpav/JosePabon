import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

fdescribe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closed event when closeModal is called', () => {
    spyOn(component.closed, 'emit');
    component.closeModal();
    expect(component.isOpen).toBe(false);
    expect(component.closed.emit).toHaveBeenCalledWith(true);
  });

  it('should call closeModal when cancel is called', () => {
    spyOn(component, 'closeModal');
    component.cancel();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should emit confirmed event and call closeModal when confirm is called', () => {
    spyOn(component.confirmed, 'emit');
    spyOn(component, 'closeModal');
    component.confirm();
    expect(component.confirmed.emit).toHaveBeenCalledWith(true);
    expect(component.closeModal).toHaveBeenCalled();
  });
});
