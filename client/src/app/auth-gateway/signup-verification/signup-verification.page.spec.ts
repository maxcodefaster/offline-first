import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupVerificationPage } from './signup-verification.page';

describe('SignupVerificationPage', () => {
  let component: SignupVerificationPage;
  let fixture: ComponentFixture<SignupVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
