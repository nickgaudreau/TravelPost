/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WritePostComponent } from './write-post.component';

describe('WritePostComponent', () => {
  let component: WritePostComponent;
  let fixture: ComponentFixture<WritePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
