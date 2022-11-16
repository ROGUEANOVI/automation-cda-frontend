import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRevisionesComponent } from './list-revisiones.component';

describe('ListRevisionesComponent', () => {
  let component: ListRevisionesComponent;
  let fixture: ComponentFixture<ListRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRevisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
