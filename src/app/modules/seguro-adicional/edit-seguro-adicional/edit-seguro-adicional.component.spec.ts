import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeguroAdicionalComponent } from './edit-seguro-adicional.component';

describe('EditSeguroAdicionalComponent', () => {
  let component: EditSeguroAdicionalComponent;
  let fixture: ComponentFixture<EditSeguroAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSeguroAdicionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSeguroAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
