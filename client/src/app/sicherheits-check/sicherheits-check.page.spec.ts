import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SicherheitsCheckPage } from './sicherheits-check.page';

describe('SicherheitsCheckPage', () => {
  let component: SicherheitsCheckPage;
  let fixture: ComponentFixture<SicherheitsCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SicherheitsCheckPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SicherheitsCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
