import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRevisionComponent } from './edit-revision.component';

describe('EditRevisionComponent', () => {
  let component: EditRevisionComponent;
  let fixture: ComponentFixture<EditRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
