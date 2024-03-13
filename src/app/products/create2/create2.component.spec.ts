import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Create2Component } from './create2.component';

describe('CreateComponent', () => {
  let component: Create2Component;
  let fixture: ComponentFixture<Create2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Create2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Create2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
