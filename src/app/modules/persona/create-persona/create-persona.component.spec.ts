import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonaComponent } from './create-persona.component';

describe('CreatePersonaComponent', () => {
  let component: CreatePersonaComponent;
  let fixture: ComponentFixture<CreatePersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
