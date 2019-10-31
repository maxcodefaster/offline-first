import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSicherheitsCheckPage } from './view-sicherheits-check.page';

describe('ViewSicherheitsCheckPage', () => {
  let component: ViewSicherheitsCheckPage;
  let fixture: ComponentFixture<ViewSicherheitsCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSicherheitsCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSicherheitsCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
