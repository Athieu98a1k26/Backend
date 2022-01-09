/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustommerComponent } from './custommer.component';

describe('CustommerComponent', () => {
  let component: CustommerComponent;
  let fixture: ComponentFixture<CustommerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustommerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustommerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
