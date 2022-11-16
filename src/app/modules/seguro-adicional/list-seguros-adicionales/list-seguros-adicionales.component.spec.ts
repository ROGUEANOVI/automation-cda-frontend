import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSegurosAdicionalesComponent } from './list-seguros-adicionales.component';

describe('ListSegurosAdicionalesComponent', () => {
  let component: ListSegurosAdicionalesComponent;
  let fixture: ComponentFixture<ListSegurosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSegurosAdicionalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSegurosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
