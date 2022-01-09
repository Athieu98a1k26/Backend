/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenumangerComponent } from './menumanger.component';

describe('MenumangerComponent', () => {
  let component: MenumangerComponent;
  let fixture: ComponentFixture<MenumangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
