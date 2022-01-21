/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CouterComponent } from './Couter.component';

describe('CouterComponent', () => {
  let component: CouterComponent;
  let fixture: ComponentFixture<CouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
