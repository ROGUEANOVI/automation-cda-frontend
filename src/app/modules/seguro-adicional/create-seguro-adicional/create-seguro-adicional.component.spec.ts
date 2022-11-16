import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeguroAdicionalComponent } from './create-seguro-adicional.component';

describe('CreateSeguroAdicionalComponent', () => {
  let component: CreateSeguroAdicionalComponent;
  let fixture: ComponentFixture<CreateSeguroAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSeguroAdicionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSeguroAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
