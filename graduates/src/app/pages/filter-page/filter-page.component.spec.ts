/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterPageComponent } from './filter-page.component';

describe('FilterPageComponent', () => {
  let component: FilterPageComponent;
  let fixture: ComponentFixture<FilterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
