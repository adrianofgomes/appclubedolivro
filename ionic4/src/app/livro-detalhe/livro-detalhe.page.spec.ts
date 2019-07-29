import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDetalhePage } from './livro-detalhe.page';

describe('LivroDetalhePage', () => {
  let component: LivroDetalhePage;
  let fixture: ComponentFixture<LivroDetalhePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroDetalhePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
