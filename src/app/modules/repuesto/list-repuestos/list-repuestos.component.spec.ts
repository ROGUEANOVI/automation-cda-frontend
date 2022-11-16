import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepuestosComponent } from './list-repuestos.component';

describe('ListRepuestosComponent', () => {
  let component: ListRepuestosComponent;
  let fixture: ComponentFixture<ListRepuestosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepuestosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
