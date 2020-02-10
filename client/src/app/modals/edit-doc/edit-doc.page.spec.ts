import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocPage } from './edit-doc.page';

describe('EditDocPage', () => {
  let component: EditDocPage;
  let fixture: ComponentFixture<EditDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
