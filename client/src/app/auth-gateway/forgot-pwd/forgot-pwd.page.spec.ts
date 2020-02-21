import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwdPage } from './forgot-pwd.page';

describe('ForgotPwdPage', () => {
  let component: ForgotPwdPage;
  let fixture: ComponentFixture<ForgotPwdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
