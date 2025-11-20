import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Medicacao } from './medicacao';

describe('Medicacao', () => {
  let component: Medicacao;
  let fixture: ComponentFixture<Medicacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Medicacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Medicacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
